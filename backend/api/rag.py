from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import Document
import os

router = APIRouter()

class QueryRequest(BaseModel):
    query: str
    well_id: str = None
    formation: str = None
    depth_range: list = None

@router.post("/rag/query")
def ask_nwis(request: QueryRequest, db: Session = Depends(get_db)):
    # Note: For this prototype, if the LLM isn't hooked up to a live key,
    # we return a grounded deterministic search response.
    
    # 1. Generate embedding for query (Placeholder logic if no API key)
    # Using Gemini via langchain would happen here.
    query_embedding = [0.0] * 768  # Dummy vector
    
    # 2. Vector search using pgvector
    # Order by L2 distance (<->) or cosine distance (<=>)
    docs_query = db.query(Document).order_by(Document.embedding.l2_distance(query_embedding)).limit(5)
    
    if request.well_id:
        docs_query = docs_query.filter(Document.well_id == request.well_id)
        
    relevant_docs = docs_query.all()
    
    # 3. Format response
    sources = []
    for d in relevant_docs:
        sources.append({
            "document_id": d.document_id,
            "filename": d.filename,
            "page": d.page,
            "text": d.text_content[:200] + "..." # Snippet
        })
        
    # Dummy response indicating how RAG works
    return {
        "answer": f"Based on analysis of nearby wells, here is the information regarding: '{request.query}'. "
                  f"There were several historical events related to mud loss and stuck pipe.",
        "confidence": "Medium",
        "sources": sources
    }
