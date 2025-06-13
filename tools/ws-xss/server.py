# server.py
import asyncio
import websockets
import re
import datetime

clients = set()
bad_ips = {}
BLOCK_THRESHOLD = 2
BLOCK_DURATION = 300  # seconds

# Daftar pola XSS umum
xss_patterns = [
    r"<.*onerror=.*?>",
    r"<script.*?>.*?</script>",
    r"javascript:",
    r"on\w+=",
    r"alert\s*\(",
    r"document\.cookie",
    r"<img\s+src=.*?onerror=.*?>",
    r"src\s*=\s*[\"']?data:text/html",
    r"<svg.*?onload=.*?>"
]

def is_xss(payload):
    for pattern in xss_patterns:
        if re.search(pattern, payload, re.IGNORECASE):
            return True
    return False

def log_xss(ip, payload):
    timestamp = datetime.datetime.now().isoformat()
    with open("xss.log", "a") as f:
        f.write(f"[{timestamp}] XSS from {ip}: {payload}\n")

def is_blocked(ip):
    if ip in bad_ips:
        attempts, first_seen = bad_ips[ip]
        if attempts >= BLOCK_THRESHOLD:
            if (datetime.datetime.now() - first_seen).total_seconds() < BLOCK_DURATION:
                return True
            else:
                del bad_ips[ip]  # unblock setelah waktu habis
    return False

def record_bad_attempt(ip):
    now = datetime.datetime.now()
    if ip in bad_ips:
        bad_ips[ip] = (bad_ips[ip][0] + 1, bad_ips[ip][1])
    else:
        bad_ips[ip] = (1, now)

async def handler(websocket, path):
    ip = websocket.remote_address[0]

    if is_blocked(ip):
        print(f"⛔ Connection from blocked IP {ip} rejected.")
        await websocket.close()
        return

    print(f"New client connected from {ip}")
    clients.add(websocket)
    try:
        async for message in websocket:
            print(f"Received: {message}")
            if is_xss(message):
                print("⚠ XSS detected. Connection closed.")
                log_xss(ip, message)
                record_bad_attempt(ip)
                await websocket.send("⚠ [SECURITY] XSS attempt detected. Connection will be closed.")
                await websocket.close()
                break
            else:
                for client in clients:
                    if client.open:
                        await client.send(message)
    finally:
        clients.discard(websocket)

# Jalankan server WebSocket
start_server = websockets.serve(handler, "localhost", 8765)
print("WebSocket server running on ws://localhost:8765")
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
