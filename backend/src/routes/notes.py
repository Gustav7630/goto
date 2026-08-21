import os
import uuid
from datetime import UTC, datetime

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from supabase import Client, create_client

from models import Note, NoteUpdate, SimpleNote

load_dotenv()

url = os.environ["SUPABASE_URL"]
key = os.environ["SUPABASE_PUBLISHABLE_KEY"]

supabase: Client = create_client(url,key)

router = APIRouter()


@router.post("/notes", response_model = SimpleNote)
async def create_note(note: SimpleNote):

    newNote = note.model_dump(mode="json")
    result = supabase.table("notes").insert(newNote).execute()

    if not result.data:
        raise HTTPException(status_code= 500, detail = "Unable to create note")

    else:
        
        return Note(**result.data[0])


@router.get("/notes/{note_id}", response_model=Note)
async def get_note(note_id: uuid.UUID) -> Note:
    existing = (supabase.table("notes").select("*").eq("id",note_id).execute())

    if not existing.data:
            raise HTTPException(status_code=404, detail=f"Note {note_id} not found")
    else:
            
            return Note(**existing.data[0])


@router.put("/notes/{note_id}")
async def update_note(note_id: uuid.UUID,updated_note: NoteUpdate) -> Note:
    existing = (supabase.table("notes").select("*").eq("id",note_id).execute())
    
    if not existing.data:
        raise HTTPException(status_code=404, detail=f"Note {note_id} not found")
    
    update_data = updated_note.model_dump(exclude_unset = True,mode="json")
    
    if not update_data: 
         raise HTTPException(status_code=400, detail="No data provided to update")
    else:

        update_data["updated_at"] = datetime.now(UTC).isoformat()
        supabase.table("notes").update(update_data).eq("id",note_id).execute()
        result = supabase.table("notes").select("*").eq("id", str(note_id)).execute()

        return Note(**result.data[0])

@router.delete("/notes/{note_id}")
async def delete_note(note_id: uuid.UUID):
    existing = (supabase.table("notes").select("*").eq("id",note_id).execute())

    if not existing.data:
        raise HTTPException(status_code=404, detail=f"Note {note_id} not found")

    
    else:
        supabase.table("notes").delete().eq("id",note_id).execute()
        return Note(**existing.data[0])
        