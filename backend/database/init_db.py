import sys
import os

# Add backend directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from database.database import engine
from database.models import Base, Well, Trajectory, DrillingTelemetry, Formation, DrillingEvent, Document

def init_db():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Done!")

if __name__ == "__main__":
    init_db()
