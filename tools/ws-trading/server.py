import asyncio
import websockets
import json
import random

async def send_price(websocket, path):
    while True:
        price = round(27000 + random.uniform(-100, 100), 2)
        data = {
            "symbol": "BTC/USDT",
            "price": price
        }
        await websocket.send(json.dumps(data))
        await asyncio.sleep(1)

start_server = websockets.serve(send_price, "0.0.0.0", 8765)

print("WebSocket server running on ws://localhost:8765")

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
