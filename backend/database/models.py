from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Text, Boolean, JSON, Date
from sqlalchemy.orm import declarative_base, relationship
from geoalchemy2 import Geometry
from pgvector.sqlalchemy import Vector

Base = declarative_base()

class Well(Base):
    __tablename__ = 'wells'
    
    well_id = Column(String, primary_key=True)
    well_name = Column(String, nullable=False)
    operator = Column(String)
    field = Column(String)
    basin = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    surface_x = Column(Float)
    surface_y = Column(Float)
    spud_date = Column(Date)
    completion_date = Column(Date)
    total_depth = Column(Float)
    well_type = Column(String)
    status = Column(String)
    
    # Location geometry for PostGIS
    location = Column(Geometry(geometry_type='POINT', srid=4326))
    
    trajectories = relationship("Trajectory", back_populates="well")
    formations = relationship("Formation", back_populates="well")
    events = relationship("DrillingEvent", back_populates="well")
    documents = relationship("Document", back_populates="well")

class Trajectory(Base):
    __tablename__ = 'trajectories'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    well_id = Column(String, ForeignKey('wells.well_id'), nullable=False)
    measured_depth = Column(Float, nullable=False)
    true_vertical_depth = Column(Float)
    inclination = Column(Float)
    azimuth = Column(Float)
    northing = Column(Float)
    easting = Column(Float)
    
    well = relationship("Well", back_populates="trajectories")

class DrillingTelemetry(Base):
    __tablename__ = 'drilling_telemetry'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    timestamp = Column(DateTime)
    well_id = Column(String, ForeignKey('wells.well_id'), nullable=False, index=True)
    measured_depth = Column(Float)
    true_vertical_depth = Column(Float)
    wob = Column(Float)
    rpm = Column(Float)
    torque = Column(Float)
    hookload = Column(Float)
    rop = Column(Float)
    mud_flow_rate = Column(Float)
    standpipe_pressure = Column(Float)
    mud_weight = Column(Float)
    pump_rate = Column(Float)
    bit_depth = Column(Float)
    ecd = Column(Float)
    mse = Column(Float)
    drag = Column(Float)
    
    # Allows adding dynamically extracted fields without schema migration
    extra_params = Column(JSON)

class Formation(Base):
    __tablename__ = 'formations'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    well_id = Column(String, ForeignKey('wells.well_id'), nullable=False)
    formation_name = Column(String, nullable=False)
    top_depth = Column(Float)
    bottom_depth = Column(Float)
    lithology = Column(String)
    geological_information = Column(Text)
    attributes = Column(JSON)
    
    well = relationship("Well", back_populates="formations")

class DrillingEvent(Base):
    __tablename__ = 'drilling_events'
    
    event_id = Column(Integer, primary_key=True, autoincrement=True)
    well_id = Column(String, ForeignKey('wells.well_id'), nullable=False)
    timestamp = Column(DateTime)
    depth = Column(Float)
    event_type = Column(String, nullable=False)  # Normalized type
    original_event_text = Column(String)
    severity = Column(String)
    duration = Column(Float)
    formation = Column(String)
    cause = Column(Text)
    description = Column(Text)
    mitigation = Column(Text)
    outcome = Column(Text)
    source_document = Column(String)
    
    well = relationship("Well", back_populates="events")

class Document(Base):
    __tablename__ = 'documents'
    
    document_id = Column(String, primary_key=True)
    well_id = Column(String, ForeignKey('wells.well_id'))
    document_type = Column(String)
    date = Column(Date)
    filename = Column(String)
    page = Column(Integer)
    text_content = Column(Text)
    metadata_json = Column(JSON)
    
    # Vector column for RAG embedding (768 dimensions for models like Gemini)
    embedding = Column(Vector(768))
    
    well = relationship("Well", back_populates="documents")
