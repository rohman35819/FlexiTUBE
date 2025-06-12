# server.py
import asyncio
import websockets
import json
import random

async def price_feed(websocket, path):
    while True:
        price = round(27000 + random.uniform(-50, 50), 2)
        data = json.dumps({
            "symbol": "BTC/USDT",
            "price": price
        })
        print(f"Sent: {data}")  # supaya kamu bisa lihat kiriman di server
        await websocket.send(data)
        await asyncio.sleep(1)

start_server = websockets.serve(price_feed, "0.0.0.0", 8765)


print("WebSocket server running on ws://localhost:8765")
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
