import uuid

from pydantic import BaseModel


class Note(BaseModel):
    id: uuid.UUID | None 
    title: str
    description: str
    trip_id: uuid.UUID  | None 
    creator_id: uuid.UUID | None 
    


class NoteUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    
class simpleNote(BaseModel):
    title: str 
    description: str 
    