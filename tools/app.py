from flask import Flask, request, render_template_string
from cek_link import cek_links
from cek_cookie import cek_cookie

app = Flask(__name__)

MENU_HTML = """
<h2>=== FlexiTUBE Tools ===</h2>
<ul>
  <li><a href="/cek_link">1. Cek Link</a></li>
  <li><a href="/cek_cookie">2. Cek Cookie</a></li>
  <li><a href="/keluar">0. Keluar</a></li>
</ul>
"""

@app.route("/")
def menu():
    return MENU_HTML

@app.route("/cek_link", methods=["GET", "POST"])
def cek_link_view():
    result = ""
    url = ""
    if request.method == "POST":
        url = request.form.get("url", "")
        if url:
            result = cek_links(url)
    return render_template_string("""
        <h2>Cek Link</h2>
        <form method="post">
            URL: <input type="text" name="url" size="60" value="{{url}}" required>
            <input type="submit" value="Cek">
        </form>
        <pre style="background:#eee; padding:10px; margin-top:15px; white-space: pre-wrap;">{{result}}</pre>
        <p><a href="/">Kembali ke menu</a></p>
    """, result=result, url=url)

@app.route("/cek_cookie", methods=["GET", "POST"])
def cek_cookie_view():
    result = ""
    cookie = ""
    if request.method == "POST":
        cookie = request.form.get("cookie", "")
        if cookie:
            result = cek_cookie(cookie)
    return render_template_string("""
        <h2>Cek Cookie</h2>
        <form method="post">
            Cookie: <input type="text" name="cookie" size="60" value="{{cookie}}" required>
            <input type="submit" value="Cek">
        </form>
        <pre style="background:#eee; padding:10px; margin-top:15px;">{{result}}</pre>
        <p><a href="/">Kembali ke menu</a></p>
    """, result=result, cookie=cookie)

@app.route("/keluar")
def keluar():
    return "<h3>Terima kasih sudah menggunakan FlexiTUBE Tools!</h3><p><a href='/'>Kembali ke menu</a></p>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
