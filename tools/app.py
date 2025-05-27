import os
from flask import Flask, request, render_template_string
from cek_link import cek_links
import logging
from logging.handlers import RotatingFileHandler

app = Flask(__name__)

# Buat folder logs jika belum ada
if not os.path.exists('logs'):
    os.makedirs('logs')

# Setup logger dengan rotasi file (maks 1MB per file, simpan 3 backup)
handler = RotatingFileHandler('logs/flexitube.log', maxBytes=1_000_000, backupCount=3)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
handler.setLevel(logging.INFO)
app.logger.addHandler(handler)
app.logger.setLevel(logging.INFO)

# Halaman utama dengan form input URL
HTML_FORM = """
<!DOCTYPE html>
<html>
<head>
    <title>FlexiTUBE - Cek Link</title>
</head>
<body>
    <h2>Masukkan URL untuk cek link:</h2>
    <form method="POST">
        <input type="text" name="url" style="width:300px;" placeholder="https://example.com" required>
        <button type="submit">Cek Links</button>
    </form>
    {% if results %}
        <h3>Hasil pengecekan link dari: {{ url }}</h3>
        <pre>{{ results }}</pre>
    {% endif %}
</body>
</html>
"""

@app.route("/", methods=["GET", "POST"])
def index():
    results = None
    if request.method == "POST":
        url = request.form.get("url")
        ip = request.remote_addr
        app.logger.info(f"IP {ip} mengakses dengan URL: {url}")
        results = cek_links(url)
    else:
        url = ""

    return render_template_string(HTML_FORM, results=results, url=url)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
