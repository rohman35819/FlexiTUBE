from flask import Flask, render_template, request
import socket
import requests
from threading import Thread
from queue import Queue

app = Flask(__name__)

# Beberapa path umum yang digunakan kamera IP untuk cek halaman akses
COMMON_PATHS = ["/", "/video", "/live", "/snapshot.jpg"]

# Load daftar username:password dari file wordlists/creds.txt
with open("wordlists/creds.txt") as f:
    CREDENTIALS = [line.strip().split(":") for line in f]

@app.route("/", methods=["GET", "POST"])
def index():
    results = []
    if request.method == "POST":
        # Ambil input IP dari textarea, pisah per baris dan buang yang kosong
        ips_text = request.form["ips"]
        ips = [ip.strip() for ip in ips_text.splitlines() if ip.strip()]
        # Mulai proses scan IP
        results = scan_ips(ips)
    return render_template("index.html", results=results)

def scan_ips(ip_list):
    """
    Fungsi untuk scan banyak IP secara paralel dengan thread pool.
    Mengembalikan list hasil scan tiap IP.
    """
    q = Queue()
    output = []

    def worker():
        while not q.empty():
            ip = q.get()
            result = check_ip(ip)
            if result:
                output.append(result)
            q.task_done()

    # Masukkan semua IP ke queue
    for ip in ip_list:
        q.put(ip)

    # Buat 50 thread untuk scan paralel
    for _ in range(50):
        t = Thread(target=worker)
        t.daemon = True  # supaya thread mati saat program selesai
        t.start()

    q.join()  # tunggu sampai semua pekerjaan selesai
    return output

def check_ip(ip):
    """
    Fungsi cek 1 IP:
    - Tes koneksi port 80 (HTTP)
    - Cek halaman dengan path umum
    - Tes login default dari daftar credentials
    """
    data = {"ip": ip, "open": False, "paths": [], "login": None}
    s = None
    try:
        s = socket.socket()
        s.settimeout(1)  # timeout 1 detik supaya gak lama nunggu respon
        s.connect((ip, 80))  # coba konek port 80
        data["open"] = True

        # Cek path umum apakah ada yang bisa diakses
        for path in COMMON_PATHS:
            url = f"http://{ip}{path}"
            try:
                r = requests.get(url, timeout=1)
                if r.status_code == 200:
                    data["paths"].append(path)
            except requests.RequestException:
                pass

        # Coba login default satu per satu
        for user, pwd in CREDENTIALS:
            try:
                r = requests.get(f"http://{ip}", auth=(user, pwd), timeout=1)
                if r.status_code == 200:
                    data["login"] = f"{user}:{pwd}"
                    break  # kalau berhasil login, tidak lanjut cek yang lain
            except requests.RequestException:
                pass

        return data

    except socket.error:
        # Port 80 tidak terbuka atau IP tidak merespon
        return data  # tetap kembalikan data dengan open=False

    finally:
        if s:
            s.close()

if __name__ == "__main__":
    # Jalankan Flask web server di port 5000, bisa diakses di semua interface lokal
    app.run(host="0.0.0.0", port=5000)
