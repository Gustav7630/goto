
import uuid
from datetime import UTC, datetime

from fastapi import APIRouter, HTTPException, Response

from db import supabase
from models import Note, NoteUpdate, SimpleNote

router = APIRouter()


@router.post("/notes", response_model = SimpleNote)
async def create_note(note: SimpleNote):

    new_note = note.model_dump(mode="json")
    result = supabase.table("notes").insert(new_note).execute()

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

    else:
    
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
        return Response(status_code=204)
        