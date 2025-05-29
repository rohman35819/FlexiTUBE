import eventlet
eventlet.monkey_patch()  # Harus di paling atas sebelum import lain

import asyncio
import ipaddress
import platform
import subprocess
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
import requests
import aiohttp
import netifaces

# Inisialisasi Flask dan SocketIO
app = Flask(__name__)
socketio = SocketIO(app, async_mode='eventlet')

# ------------------------------------------
def get_local_subnet():
    try:
        for iface in netifaces.interfaces():
            addrs = netifaces.ifaddresses(iface)
            if netifaces.AF_INET in addrs:
                for link in addrs[netifaces.AF_INET]:
                    ip = link.get('addr')
                    netmask = link.get('netmask')
                    if ip and netmask and not ip.startswith('127.'):
                        network = ipaddress.IPv4Network(f"{ip}/{netmask}", strict=False)
                        return str(network)
    except Exception:
        pass
    return "192.168.1.0/24"

# ------------------------------------------
async def async_ping(ip: str) -> bool:
    param = '-n' if platform.system().lower() == 'windows' else '-c'
    timeout_param = ['-w', '1000'] if platform.system().lower() == 'windows' else ['-W', '1']
    cmd = ['ping', param, '1'] + timeout_param + [ip]

    proc = await asyncio.create_subprocess_exec(
        *cmd,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    retcode = await proc.wait()
    return retcode == 0

# ------------------------------------------
async def scan_subnet(subnet, sid):
    net = ipaddress.ip_network(subnet, strict=False)
    hosts = list(net.hosts())
    total = len(hosts)
    active_ips = []
    semaphore = asyncio.Semaphore(100)

    async def sem_ping(ip):
        async with semaphore:
            is_alive = await async_ping(ip)
            socketio.emit('scan_progress', {
                'current': hosts.index(ip)+1,
                'total': total,
                'ip': ip,
                'alive': is_alive
            }, to=sid)
            return ip if is_alive else None

    tasks = [sem_ping(str(ip)) for ip in hosts]
    results = await asyncio.gather(*tasks)
    for r in results:
        if r:
            active_ips.append(r)

    socketio.emit('scan_done', {'active_ips': active_ips}, to=sid)
    return active_ips

# ------------------------------------------
def analyze_ip(ip):
    url = f"http://ip-api.com/json/{ip}"
    try:
        resp = requests.get(url, timeout=5)
        resp.raise_for_status()
        data = resp.json()
        if data.get('status') == 'success':
            return data
        else:
            return {'error': 'IP tidak valid atau tidak ditemukan'}
    except Exception as e:
        return {'error': str(e)}

# ------------------------------------------
def check_port(ip, port, timeout=1):
    import socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(timeout)
    try:
        result = sock.connect_ex((ip, port))
        sock.close()
        return result == 0
    except:
        return False

# ------------------------------------------
@app.route('/')
def index():
    subnet = get_local_subnet()
    return render_template('index.html', local_subnet=subnet)

# ------------------------------------------
@app.route('/api/analyze', methods=['POST'])
def api_analyze():
    data = request.json
    ip = data.get('ip')
    if not ip:
        return jsonify({'error': 'IP tidak boleh kosong'}), 400
    result = analyze_ip(ip)
    return jsonify(result)

# ------------------------------------------
@app.route('/api/check_port', methods=['POST'])
def api_check_port():
    data = request.json
    ip = data.get('ip')
    port = int(data.get('port', 0))
    if not ip or not port:
        return jsonify({'error': 'IP dan port harus diisi'}), 400
    status = check_port(ip, port)
    return jsonify({'ip': ip, 'port': port, 'open': status})

# ------------------------------------------
@socketio.on('start_scan')
def handle_start_scan(data):
    subnet = data.get('subnet')
    sid = request.sid
    if not subnet:
        emit('scan_error', {'error': 'Subnet harus diisi'}, to=sid)
        return
    # Gunakan thread eventlet agar non-blocking
    def background_task():
        asyncio.set_event_loop(asyncio.new_event_loop())
        asyncio.get_event_loop().run_until_complete(scan_subnet(subnet, sid))
    socketio.start_background_task(background_task)

# ------------------------------------------
if __name__ == "__main__":
    from eventlet import wsgi
    import eventlet
    wsgi.server(eventlet.listen(("0.0.0.0", 5000)), app)
