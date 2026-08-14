from fastapi import FastAPI

from .routes import notes

app = FastAPI()
app.include_router(notes.router)


@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
