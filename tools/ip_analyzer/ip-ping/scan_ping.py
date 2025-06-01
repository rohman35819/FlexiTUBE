import os

subnet = "192.168.124"
for i in range(1, 255):
    ip = f"{subnet}.{i}"
    response = os.system(f"ping -c 1 -W 1 {ip} > /dev/null")
    if response == 0:
        print(f"[+] Aktif: {ip}")
    else:
        print(f"[-] Tidak aktif: {ip}")
