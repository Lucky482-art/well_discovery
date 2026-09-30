# eRTMAC-NWIS

**Nearby Wells Intelligence System (NWIS)**
*An AI-Powered Offset Well Knowledge & Decision Support Platform for Oil India Limited (OIL) - SIH Prototype*

> **Note**: Prototype validation uses publicly released petroleum-field data (Equinor Volve dataset). Production deployment is designed for authorized OIL/eRTMAC data.

## Features
- **Functional 3D Map**: Built with React Three Fiber/Three.js showing well locations, 3D trajectories, formations, and historical events.
- **Role-based Views**: Field Engineer (real-time telemetry) and Office Engineer (offset analysis).
- **RAG / Ask NWIS**: Query historical events and get evidence-grounded answers.
- **Risk Engine**: 40-meter lookahead forecasting with explainable rules based on offset events.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Recharts, React Three Fiber.
- **Backend**: Python, FastAPI.
- **Database**: PostgreSQL, PostGIS, pgvector.

## Setup Instructions

### 1. Database (Docker)
Ensure Docker Desktop is installed and running.
```bash
docker-compose up -d --build
```
This will start PostgreSQL 15 with `postgis` and `pgvector` extensions automatically configured.

### 2. Backend API
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python database/init_db.py  # Create schemas
python ingestion/ingest_wells.py # Load base well data
uvicorn main:app --reload
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.
