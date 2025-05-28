from flask import Flask, render_template, request
import requests
from requests.auth import HTTPBasicAuth
import socket

app = Flask(__name__)

# Daftar path yang umum dipakai kamera IP untuk cek akses
COMMON_PATHS = ['/', '/login', '/admin', '/video.cgi', '/stream', '/live']

# Fungsi cek port 80 terbuka
def is_port_open(ip, port=80, timeout=1):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        result = sock.connect_ex((ip, port))
        sock.close()
        return result == 0
    except Exception:
        return False

# Route utama: scan IP kamera
@app.route('/', methods=['GET', 'POST'])
def index():
    results = []
    if request.method == 'POST':
        ip_list = request.form['ips'].strip().split('\n')
        for ip in ip_list:
            ip = ip.strip()
            if not ip:
                continue
            port_open = is_port_open(ip)
            results.append({
                'ip': ip,
                'port_80': port_open
            })
    return render_template('index.html', results=results)

# Route untuk menampilkan streaming kamera IP
@app.route('/stream')
def stream():
    ip = request.args.get('ip')
    if not ip:
        return "IP Kamera tidak diberikan", 400
    
    # Default URL streaming kamera (ubah jika perlu)
    stream_url = f"http://{ip}/video.cgi"

    return render_template('stream.html', stream_url=stream_url, ip=ip)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
