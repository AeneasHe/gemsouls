import wpath
from app import *


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            data = await websocket.receive_text()
            print(f"recieve data:{data}")
            await websocket.send_text(f"{data}")

        except Exception as e:
            print(e)
            break
