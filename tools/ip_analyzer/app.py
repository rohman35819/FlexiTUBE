import eventlet
eventlet.monkey_patch()  # harus paling atas

from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
import asyncio
import ipaddress
import platform
import subprocess
import requests
import netifaces

app = Flask(__name__)
socketio = SocketIO(app, async_mode='eventlet')  # PAKAI eventlet!

# Fungsi async contoh (ping simulasi)
async def async_ping(ip: str) -> bool:
    # ping 1 kali timeout 1 detik
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

# Scan subnet async dengan socketio emit progress
async def scan_subnet(subnet, sid):
    net = ipaddress.ip_network(subnet, strict=False)
    hosts = list(net.hosts())
    total = len(hosts)

    for i, ip in enumerate(hosts, start=1):
        alive = await async_ping(str(ip))
        socketio.emit('scan_progress', {
            'current': i,
            'total': total,
            'ip': str(ip),
            'alive': alive
        }, to=sid)

    socketio.emit('scan_done', {'message': 'Scan selesai!'}, to=sid)

@app.route('/')
def index():
    return "Hello from IP Analyzer!"

@socketio.on('start_scan')
def handle_start_scan(data):
    subnet = data.get('subnet')
    sid = request.sid

    if not subnet:
        emit('scan_error', {'error': 'Subnet harus diisi'}, to=sid)
        return

    # Jalankan async scan di background thread eventlet
    def background_task():
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(scan_subnet(subnet, sid))
        loop.close()

    socketio.start_background_task(background_task)

if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=5000)
