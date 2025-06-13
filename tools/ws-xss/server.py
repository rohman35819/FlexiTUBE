import asyncio
import websockets
import re

# Deteksi sederhana payload XSS
def is_xss(payload):
    patterns = [
        r"<img[^>]+onerror\s*=",
        r"<script.*?>",
        r"on\w+\s*=",         # event handler seperti onclick=
        r"alert\s*\(",
        r"javascript:"
    ]
    return any(re.search(p, payload, re.IGNORECASE) for p in patterns)

async def handle_client(websocket, path):
    print("New client connected.")
    try:
        async for message in websocket:
            print(f"Received: {message}")

            if is_xss(message):
                warning = "⚠️ XSS detected. Connection closed."
                print(warning)
                await websocket.send(warning)
                await websocket.close()
                break

            await websocket.send(message)  # echo back (atau broadcast ke client lain nanti)

    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected.")

start_server = websockets.serve(handle_client, "localhost", 8765)
print("WebSocket server running on ws://localhost:8765")
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
