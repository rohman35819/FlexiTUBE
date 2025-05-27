import requests

def cek_cookie(url):
    try:
        res = requests.get(url, timeout=10)
        cookies = res.cookies
        output = [f"[INFO] Cookie ditemukan di {url}:"]
        for cookie in cookies:
            output.append(f" - {cookie.name} = {cookie.value}")
        if not cookies:
            output.append(" - Tidak ada cookie.")
        return "\n".join(output)
    except requests.RequestException as e:
        return f"[ERROR] Gagal mengambil URL: {e}"
