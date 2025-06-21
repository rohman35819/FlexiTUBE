import asyncio
import websockets

LOG_FILE = "data.log"

connected = set()

async def handler(websocket, path):
    connected.add(websocket)
    try:
        async for message in websocket:
            print(f"Received: {message}")
            # Log jika terdeteksi payload XSS
            if "<script>" in message or "onerror=" in message:
                with open(LOG_FILE, "a") as log:
                    log.write(message + "\n")
            for conn in connected:
                if conn != websocket:
                    await conn.send(message)
    finally:
        connected.remove(websocket)

start_server = websockets.serve(handler, "localhost", 8080)
asyncio.get_event_loop().run_until_complete(start_server)
print("WebSocket server running on ws://localhost:8080")
asyncio.get_event_loop().run_forever()
