import os
import uuid

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from src.models import Note
from supabase import Client, create_client

load_dotenv()

url = os.environ["SUPABASE_URL"]
key = os.environ["SUPABASE_PUBLISHABLE_KEY"]

supabase: Client = create_client(url,key)

router = APIRouter()


@router.post("/notes", response_model = Note)
async def create_note(note: Note) -> Note:
    result = supabase.table("notes").insert(note.model_dump(mode="json")).execute()

    print("RESULT:", result)
    print("DATA:", result.data)

    if not result.data:
        raise HTTPException(status_code= 500, detail = "Unable to create note")
    return Note(**result.data[0])


@router.get("/notes/{note_id}", response_model=Note)
async def get_note(note_id: uuid.UUID) -> Note:
    existing = (supabase.table("notes").select("*").eq("id",note_id).execute())

    if not existing.data:
            raise HTTPException(status_code=404, detail=f"Note {note_id} not found")
    else:
            
            return Note(existing.data[0])


@router.put("/notes/{note_id}")
async def update_note(note_id: uuid.UUID) -> Note:
    raise HTTPException(status_code=404, detail=f"Note {note_id} not found")

@router.delete("/notes/{note_id}")
async def delete_note(note_id: uuid.UUID):
    existing = (supabase.table("notes").select("*").eq("id",note_id).execute())

    if not existing.data:
        raise HTTPException(status_code=404, detail=f"Note {note_id} not found")
    else:
        supabase.table("notes").delete().eq("id",note_id).execute()
        return Note(existing.data[0])
        