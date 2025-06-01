import socket

# Ganti IP sesuai yang kamu temukan aktif tadi
TARGET_IP = "192.168.124.83"
# Port umum: web, ssh, rtsp, kamera, dll
PORTS = [22, 23, 80, 443, 554, 8080, 8888]

for port in PORTS:
    try:
        sock = socket.socket()
        sock.settimeout(1)
        result = sock.connect_ex((TARGET_IP, port))
        if result == 0:
            print(f"[+] Port {port} terbuka di {TARGET_IP}")
        else:
            print(f"[-] Port {port} tertutup")
        sock.close()
    except Exception as e:
        print(f"[!] Error cek port {port}: {e}")
