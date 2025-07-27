from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query, HTTPException, status
from typing import List, Dict, Union
import json
from ..auth.jwt_handler import verify_token

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, Dict[WebSocket, str]] = {}

    def get_users_in_session(self, session_id: str) -> List[str]:
        if session_id in self.active_connections:
            return list(self.active_connections[session_id].values())
        return []

    async def connect(self, websocket: WebSocket, session_id: str, username: str):
        await websocket.accept()
        if session_id not in self.active_connections:
            self.active_connections[session_id] = {}
        self.active_connections[session_id][websocket] = username
        await self.broadcast_user_list(session_id)

    async def disconnect(self, websocket: WebSocket, session_id: str):
        if session_id in self.active_connections and websocket in self.active_connections[session_id]:
            del self.active_connections[session_id][websocket]
            if not self.active_connections[session_id]:
                del self.active_connections[session_id]
            await self.broadcast_user_list(session_id)

    async def broadcast_user_list(self, session_id: str):
        user_list = self.get_users_in_session(session_id)
        message = {"type": "user_list", "users": user_list}
        await self.broadcast_json(message, session_id, sender=None)

    async def broadcast_json(self, message: dict, session_id: str, sender: Union[WebSocket, None]):
        if session_id in self.active_connections:
            for connection in self.active_connections[session_id].keys():
                if connection != sender:
                    await connection.send_json(message)

manager = ConnectionManager()

@router.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str, token: str = Query(...)):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
    username = verify_token(token, credentials_exception)
    if not username:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    await manager.connect(websocket, session_id, username)
    
    try:
        while True:
            data = await websocket.receive_json()
            data["sender"] = username
            await manager.broadcast_json(data, session_id, websocket)
    except WebSocketDisconnect:
        await manager.disconnect(websocket, session_id)