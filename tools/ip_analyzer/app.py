from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

def analyze_ip(ip):
    url = f"http://ip-api.com/json/{ip}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
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
        return {"error": "Gagal mengambil data IP"}

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
    app.run(port=5000)
