import uuid
from datetime import UTC, datetime

from pydantic import BaseModel, Field


class Note(BaseModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4)
    title: str
    description: str
    trip_id: uuid.UUID
    creator_id: uuid.UUID
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))


class NoteUpdate(BaseModel):
    title: str = None
    description: str = None
    
