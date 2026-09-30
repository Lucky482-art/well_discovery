from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import json

from database.database import get_db
from database.models import Well, Trajectory, DrillingTelemetry, Formation, DrillingEvent

router = APIRouter()

@router.get("/wells")
def get_wells(db: Session = Depends(get_db)):
    wells = db.query(Well).all()
    return [{"well_id": w.well_id, "well_name": w.well_name, "field": w.field, "operator": w.operator, "latitude": w.latitude, "longitude": w.longitude, "well_type": w.well_type, "status": w.status} for w in wells]

@router.get("/wells/{well_id:path}/trajectory")
def get_well_trajectory(well_id: str, db: Session = Depends(get_db)):
    trajectory = db.query(Trajectory).filter(Trajectory.well_id == well_id).order_by(Trajectory.measured_depth).all()
    return trajectory

@router.get("/wells/{well_id:path}/telemetry")
def get_well_telemetry(well_id: str, limit: int = 1000, db: Session = Depends(get_db)):
    telemetry = db.query(DrillingTelemetry).filter(DrillingTelemetry.well_id == well_id).order_by(DrillingTelemetry.timestamp).limit(limit).all()
    return telemetry

@router.get("/wells/{well_id:path}/formations")
def get_well_formations(well_id: str, db: Session = Depends(get_db)):
    formations = db.query(Formation).filter(Formation.well_id == well_id).order_by(Formation.top_depth).all()
    return formations

@router.get("/wells/{well_id:path}")
def get_well(well_id: str, db: Session = Depends(get_db)):
    well = db.query(Well).filter(Well.well_id == well_id).first()
    if not well:
        raise HTTPException(status_code=404, detail="Well not found")
    return {"well_id": well.well_id, "well_name": well.well_name, "field": well.field, "operator": well.operator, "latitude": well.latitude, "longitude": well.longitude, "well_type": well.well_type, "status": well.status}

@router.get("/nearby-wells")
def get_nearby_wells(lat: float, lon: float, radius_km: float = 5.0, db: Session = Depends(get_db)):
    # PostGIS spatial query for distance
    # ST_DWithin uses meters if geography type, or degrees if geometry
    # We will use ST_DistanceSphere for lat/lon calculation in meters
    radius_meters = radius_km * 1000
    
    # Query using GeoAlchemy2/PostGIS functions
    from sqlalchemy import func
    
    point = f'SRID=4326;POINT({lon} {lat})'
    
    nearby = db.query(Well, func.ST_DistanceSphere(Well.location, func.ST_GeomFromEWKT(point)).label('distance'))\
               .filter(func.ST_DistanceSphere(Well.location, func.ST_GeomFromEWKT(point)) <= radius_meters)\
               .order_by('distance')\
               .all()
               
    result = []
    for well, distance in nearby:
        well_dict = {c.name: getattr(well, c.name) for c in well.__table__.columns if c.name != 'location'}
        well_dict['distance_km'] = round(distance / 1000, 2)
        result.append(well_dict)
        
    return result
