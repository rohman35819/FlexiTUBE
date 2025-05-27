import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def cek_links(url):
    output = []
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; FlexiTUBE-Bot/1.0)"
    }
    try:
        res = requests.get(url, headers=headers, timeout=10)
        output.append(f"[INFO] Mengambil konten dari {url} (status {res.status_code})\n")

        soup = BeautifulSoup(res.text, "lxml")
        links = soup.find_all("a")
        output.append(f"[INFO] Ditemukan {len(links)} link.\n")

        for link in links:
            href = link.get("href")
            if href is None or href.startswith("javascript:"):
                continue
            full_url = urljoin(url, href)
            try:
                r = requests.head(full_url, allow_redirects=True, timeout=5)
                status = r.status_code
                if status == 200:
                    output.append(f"[OK]    {status} - {full_url}")
                elif status == 404:
                    output.append(f"[X]     {status} - {full_url}")
                else:
                    output.append(f"[?]     {status} - {full_url}")
            except requests.RequestException as e:
                output.append(f"[ERR]   Gagal cek {full_url}: {e}")
        return "\n".join(output)

    except requests.RequestException as e:
        return f"[ERROR] Gagal mengambil URL: {e}"
