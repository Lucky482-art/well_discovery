from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import math
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Volve Wells
wells_data = [
    {"well_id": "15/9-F-1", "well_name": "15/9-F-1", "field": "Volve", "latitude": 58.4419, "longitude": 1.905, "status": "Active"},
    {"well_id": "15/9-F-11 B", "well_name": "15/9-F-11 B", "field": "Volve", "latitude": 58.442, "longitude": 1.905, "status": "Offset"},
    {"well_id": "15/9-F-4", "well_name": "15/9-F-4", "field": "Volve", "latitude": 58.445, "longitude": 1.910, "status": "Offset"},
]

@app.get("/api/wells")
def get_wells():
    return wells_data

@app.get("/api/wells/{well_id}/telemetry")
def get_telemetry(well_id: str):
    # Mock generating telemetry
    base_depth = 2500
    telemetry = []
    for i in range(24):
        telemetry.append({
            "timestamp": f"2026-01-01T{i:02d}:00:00Z",
            "measured_depth": base_depth + (i * 10),
            "rop": random.uniform(15, 25),
            "wob": random.uniform(10, 20),
            "torque": random.uniform(12, 18),
            "spp": random.uniform(2500, 3000)
        })
    return telemetry

@app.get("/api/nearby-wells")
def get_nearby_wells(lat: float, lon: float, radius_km: float = 5.0):
    return wells_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
