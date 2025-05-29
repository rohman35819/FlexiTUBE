import asyncio
import ipaddress
import platform
import subprocess
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
import requests
import aiohttp
import netifaces

# Inisialisasi Flask dan SocketIO (eventlet async server)
app = Flask(__name__)
socketio = SocketIO(app, async_mode='eventlet')

# ------------------------------------------
# Fungsi mendapatkan subnet lokal otomatis
def get_local_subnet():
    try:
        for iface in netifaces.interfaces():
            addrs = netifaces.ifaddresses(iface)
            if netifaces.AF_INET in addrs:
                for link in addrs[netifaces.AF_INET]:
                    ip = link.get('addr')
                    netmask = link.get('netmask')
                    # Lewati localhost dan IP tanpa netmask valid
                    if ip and netmask and not ip.startswith('127.'):
                        network = ipaddress.IPv4Network(f"{ip}/{netmask}", strict=False)
                        return str(network)
    except Exception:
        pass
    return "192.168.1.0/24"

# ------------------------------------------
# Fungsi async ping dengan subprocess cross-platform
async def async_ping(ip: str) -> bool:
    param = '-n' if platform.system().lower() == 'windows' else '-c'
    # Timeout 1 detik (Windows pakai -w 1000, Linux -W 1)
    timeout_param = ['-w', '1000'] if platform.system().lower() == 'windows' else ['-W', '1']
    cmd = ['ping', param, '1'] + timeout_param + [ip]

    # Jalankan subprocess ping secara async
    proc = await asyncio.create_subprocess_exec(
        *cmd,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    retcode = await proc.wait()
    return retcode == 0

# ------------------------------------------
# Async function untuk scan subnet dengan concurrency tinggi dan progress update via socketio
async def scan_subnet(subnet, sid):
    net = ipaddress.ip_network(subnet, strict=False)
    hosts = list(net.hosts())
    total = len(hosts)
    active_ips = []

    # Batasi concurrency untuk jaga resource
    semaphore = asyncio.Semaphore(100)

    async def sem_ping(ip):
        async with semaphore:
            is_alive = await async_ping(ip)
            # Kirim update progress ke client via socketio
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

    # Kirim hasil akhir
    socketio.emit('scan_done', {'active_ips': active_ips}, to=sid)
    return active_ips

# ------------------------------------------
# API ip-api.com untuk analisis IP
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
# API untuk cek port TCP sederhana dengan socket
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
# Route index, kirim halaman utama dengan subnet otomatis
@app.route('/')
def index():
    subnet = get_local_subnet()
    return render_template('index.html', local_subnet=subnet)

# ------------------------------------------
# Endpoint POST untuk analisis IP
@app.route('/api/analyze', methods=['POST'])
def api_analyze():
    data = request.json
    ip = data.get('ip')
    if not ip:
        return jsonify({'error': 'IP tidak boleh kosong'}), 400
    result = analyze_ip(ip)
    return jsonify(result)

# ------------------------------------------
# Endpoint POST untuk cek port
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
# SocketIO event: scan subnet
@socketio.on('start_scan')
def handle_start_scan(data):
    subnet = data.get('subnet')
    sid = request.sid
    if not subnet:
        emit('scan_error', {'error': 'Subnet harus diisi'}, to=sid)
        return
    # Jalankan scan async, tapi harus dari thread yang mendukung asyncio
    asyncio.run(scan_subnet(subnet, sid))

# ------------------------------------------
if __name__ == '__main__':
    # Jalankan dengan eventlet supaya socketio bisa jalan
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
