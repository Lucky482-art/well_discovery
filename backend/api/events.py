from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import DrillingEvent, Well

router = APIRouter()

@router.get("/events")
def get_events(well_id: str = None, event_type: str = None, db: Session = Depends(get_db)):
    query = db.query(DrillingEvent)
    if well_id:
        query = query.filter(DrillingEvent.well_id == well_id)
    if event_type:
        query = query.filter(DrillingEvent.event_type == event_type)
        
    return query.order_by(DrillingEvent.timestamp.desc()).all()

@router.get("/events/{event_id}")
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(DrillingEvent).filter(DrillingEvent.event_id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event
