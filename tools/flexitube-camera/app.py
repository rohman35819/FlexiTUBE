from flask import Flask, render_template, request
import requests

app = Flask(__name__)

ZOMEYE_API_KEY = "9851067F-D1c1-A0a92-211d-66315985205"  # Masukkan API key Zomeye kamu di sini

def search_zomeye(query):
    url = "https://api.zomeye.org/web/search"
    headers = {
        "API-Key": ZOMEYE_API_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "query": query,
        "page": 1,
        "size": 10
    }
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
        # Ambil IP dari hasil (asumsi format data sesuai dokumentasi Zomeye)
        ips = []
        for item in data.get("matches", []):
            ip = item.get("ip")
            if ip:
                ips.append(ip)
        return ips
    except Exception as e:
        print(f"Gagal panggil API Zomeye: {e}")
        return []

@app.route('/', methods=['GET', 'POST'])
def index():
    rtsp_url = ""
    zomeye_results = []
    if request.method == 'POST':
        ip = request.form.get('ip')
        port = request.form.get('port') or '554'
        stream_path = request.form.get('path') or 'stream'
        zomeye_query = request.form.get('zomeye_query')

        if zomeye_query:
            zomeye_results = search_zomeye(zomeye_query)
        elif ip:
            rtsp_url = f"rtsp://{ip}:{port}/{stream_path}"

    return render_template('index.html', rtsp_url=rtsp_url, zomeye_results=zomeye_results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
