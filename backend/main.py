from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="eRTMAC-NWIS API", description="AI-Powered Offset Well Knowledge & Decision Support Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from api import wells, events, rag

app.include_router(wells.router, prefix="/api", tags=["Wells"])
app.include_router(events.router, prefix="/api", tags=["Events"])
app.include_router(rag.router, prefix="/api", tags=["RAG"])

@app.get("/")
def root():
    return {"status": "ok", "message": "NWIS API is running."}

@app.get("/api/health")
def health():
    return {"status": "ok"}

