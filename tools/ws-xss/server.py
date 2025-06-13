import asyncio
import websockets
import html

clients = set()

def is_xss(payload: str) -> bool:
    xss_signatures = ["<script", "onerror", "onload", "alert", "src=", "`", "&#"]
    return any(sig.lower() in payload.lower() for sig in xss_signatures)

async def handler(websocket, path):
    clients.add(websocket)
    print("New client connected.")

    try:
        async for message in websocket:
            print(f"Received: {message}")

            if is_xss(message):
                warning = "⚠ XSS detected. Connection closed."
                print(warning)
                await websocket.send("🚫 XSS detected! Connection will be closed.")
                await websocket.close()
                break
            else:
                # Broadcast ke semua client yang masih aktif
                safe_message = html.escape(message)
                for client in clients:
                    if client.open:
                        await client.send(message)

    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected.")
    finally:
        clients.remove(websocket)

print("WebSocket server running on ws://localhost:8765")
start_server = websockets.serve(handler, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
