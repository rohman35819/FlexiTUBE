from flask import Flask, request, render_template, jsonify
import requests
import subprocess
import ipaddress
import platform
import threading
import queue

app = Flask(__name__)

def analyze_ip(ip):
    url = f"http://ip-api.com/json/{ip}"
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        data = response.json()
        if data['status'] == 'success':
            return {
                "IP": ip,
                "Country": data.get("country"),
                "Region": data.get("regionName"),
                "City": data.get("city"),
                "ISP": data.get("isp"),
                "Org": data.get("org"),
                "AS": data.get("as"),
                "Reverse": data.get("reverse"),
                "Mobile": data.get("mobile"),
                "Proxy": data.get("proxy"),
                "Hosting": data.get("hosting"),
                "Timezone": data.get("timezone"),
                "Lat": data.get("lat"),
                "Lon": data.get("lon"),
            }
        else:
            return {"error": "IP tidak ditemukan atau tidak valid"}
    except Exception as e:
        return {"error": f"Gagal mengambil data IP: {str(e)}"}

def ping_ip(ip):
    param = '-n' if platform.system().lower() == 'windows' else '-c'
    command = ['ping', param, '1', '-w', '1000', ip]
    try:
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return result.returncode == 0
    except:
        return False

def scan_subnet(subnet):
    try:
        net = ipaddress.ip_network(subnet, strict=False)
    except ValueError:
        return []

    q = queue.Queue()
    for ip in net.hosts():
        q.put(str(ip))

    active_ips = []

    def worker():
        while not q.empty():
            ip = q.get()
            if ping_ip(ip):
                active_ips.append(ip)
            q.task_done()

    threads = []
    for _ in range(30):
        t = threading.Thread(target=worker)
        t.daemon = True
        t.start()
        threads.append(t)

    q.join()
    return active_ips

@app.route('/', methods=['GET', 'POST'])
def index():
    result = None
    ip = None
    if request.method == 'POST':
        ip = request.form.get('ip')
        if ip:
            result = analyze_ip(ip)
    return render_template('index.html', result=result, ip=ip)

@app.route('/scan', methods=['POST'])
def scan():
    data = request.get_json()
    subnet = data.get('subnet')
    if not subnet:
        return jsonify({'error': 'Subnet harus diisi'}), 400
    active_ips = scan_subnet(subnet)
    return jsonify({'active_ips': active_ips})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
