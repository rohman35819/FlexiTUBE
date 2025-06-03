from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    rtsp_url = ""
    if request.method == 'POST':
        ip = request.form.get('ip')
        port = request.form.get('port') or '554'
        stream_path = request.form.get('path') or 'stream'
        rtsp_url = f"rtsp://{ip}:{port}/{stream_path}"
    return render_template('index.html', rtsp_url=rtsp_url)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
