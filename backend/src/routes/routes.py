import os
import uuid
from datetime import UTC, datetime

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from supabase import Client, create_client

from src.models import Note, NoteUpdate

load_dotenv()

url = os.environ["SUPABASE_URL"]
key = os.environ["SUPABASE_PUBLISHABLE_KEY"]

supabase: Client = create_client(url,key)

router = APIRouter()


@router.post("/notes", response_model = Note)
async def create_note(note: Note) -> Note:
    raise HTTPException(status_code=400, detail="not implemented yet")
    

@router.get("/notes/{note_id}", response_model=Note)
async def get_route(note_id: uuid.UUID) -> Note:
    raise HTTPException(status_code=400, detail="not implemented yet")


@router.put("/notes/{note_id}")
async def update_route(note_id: uuid.UUID,updated_note: NoteUpdate) -> Note:
    
        raise HTTPException(status_code=400, detail="not implemented yet")
    


@router.delete("/notes/{note_id}")
async def delete_map(map_id: uuid.UUID):

    raise HTTPException(status_code=400, detail="not implemented yet")
        