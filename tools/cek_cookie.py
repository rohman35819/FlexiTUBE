def cek_cookie(cookie_string):
    # Contoh fungsi sederhana, cek apakah cookie ada "session"
    if "session" in cookie_string.lower():
        return "[OK] Cookie mengandung session."
    else:
        return "[WARN] Cookie tidak mengandung session."
