# models.py

from pydantic import BaseModel
from typing import Dict, List

# API �Է� �� ��ȯ ��

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

# Ŭ�� ���� ���

class BaseMessage(BaseModel):
    type: str  # ���� ��� 'chat', 'game_start', 'game_end' ���� Ÿ���� ǥ��

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