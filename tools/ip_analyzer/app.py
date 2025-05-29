from flask import Flask, request, render_template
import requests

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

@app.route('/', methods=['GET', 'POST'])
def index():
    result = None
    ip = None
    if request.method == 'POST':
        ip = request.form.get('ip')
        if ip:
            result = analyze_ip(ip)
    return render_template('index.html', result=result, ip=ip)

if __name__ == '__main__':
    # Jalankan dengan host 0.0.0.0 supaya bisa diakses dari luar jika perlu
    app.run(host='0.0.0.0', port=5000)
