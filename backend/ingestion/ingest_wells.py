import os
import sys
import random
from datetime import datetime, timedelta

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from database.database import SessionLocal
from database.models import Well, DrillingTelemetry

def ingest_wells():
    db = SessionLocal()
    print("Ingesting base wells and telemetry to Postgres...")
    
    wells_to_add = [
        {
            "well_id": "15/9-F-1",
            "well_name": "15/9-F-1",
            "field": "Volve",
            "operator": "Equinor",
            "latitude": 58.4419,
            "longitude": 1.905,
            "well_type": "Active",
            "status": "Drilling"
        },
        {
            "well_id": "15/9-F-11 B",
            "well_name": "15/9-F-11 B",
            "field": "Volve",
            "operator": "Equinor",
            "latitude": 58.442,
            "longitude": 1.906,
            "well_type": "Offset",
            "status": "Closed"
        },
        {
            "well_id": "15/9-F-4",
            "well_name": "15/9-F-4",
            "field": "Volve",
            "operator": "Equinor",
            "latitude": 58.445,
            "longitude": 1.910,
            "well_type": "Offset",
            "status": "Closed"
        }
    ]
    
    for w in wells_to_add:
        # Check if exists
        existing = db.query(Well).filter(Well.well_id == w["well_id"]).first()
        if not existing:
            # PostGIS location
            wkt_location = f"SRID=4326;POINT({w['longitude']} {w['latitude']})"
            well = Well(
                well_id=w["well_id"],
                well_name=w["well_name"],
                field=w["field"],
                operator=w["operator"],
                latitude=w["latitude"],
                longitude=w["longitude"],
                well_type=w["well_type"],
                status=w["status"],
                location=wkt_location
            )
            db.add(well)
            db.commit() # commit well first
            print(f"Added well {w['well_name']}")
            
            # Generate 100 rows of telemetry for this well
            base_time = datetime(2026, 1, 1, 0, 0, 0)
            base_depth = 2500 if w['well_type'] == 'Active' else 3000
            for i in range(100):
                telemetry = DrillingTelemetry(
                    timestamp=base_time + timedelta(minutes=i*10),
                    well_id=w["well_id"],
                    measured_depth=base_depth + (i * 5),
                    wob=random.uniform(10, 25),
                    rpm=random.uniform(80, 120),
                    torque=random.uniform(15, 30),
                    rop=random.uniform(10, 35),
                    mud_flow_rate=random.uniform(1800, 2200),
                    standpipe_pressure=random.uniform(2500, 3200)
                )
                db.add(telemetry)
            db.commit() # commit telemetry
        else:
            print(f"Well {w['well_name']} already exists.")
            
    db.commit()
    db.close()
    print("Base wells and telemetry ingested successfully.")

if __name__ == "__main__":
    ingest_wells()
