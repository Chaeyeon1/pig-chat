# models.py

from pydantic import BaseModel
from typing import Dict, List

# API 입력 및 반환 모델

class UserModel(BaseModel):
    Name: str
    UserID: str
    
class RoomModel(BaseModel):
    MaxUser: int = 8  
    Name: str 
    RoomID: str    
    RoomState: bool = False 
    RoomHostID: str 
    UserList: List[UserModel] = []

class Item(BaseModel):
    name: str
    price: float
    description: str = None

class ItemResponse(BaseModel):
    id: int
    name: str
    price: float
    description: str = None

# 클라 서버 통신

class BaseMessage(BaseModel):
    type: str  # 예를 들어 'chat', 'game_start', 'game_end' 등의 타입을 표현

class Alert(BaseMessage):
    text: str

class Chat(BaseMessage):
    userID: str
    text: str    

class State(BaseMessage):
    userID: str
    speak: bool

class Role(BaseMessage):
    userID: str
    role: str
    word: str

class Process(BaseMessage):
    state: str
    time: int

class RoomInfo(BaseMessage):
    room: dict

class GameInfo(BaseMessage):
    # type: "gameInfo"
    wolf: str = None
    live_player: List[str] = {}
    dead_player: List[str] = {}
    process: str = None
    current_player: str = None
    wolfSubject: str = None
    pigSubject: str = None
