from app.database import SessionLocal
from sqlalchemy import text
from database import SessionLocal

def test_postgres():
    db = SessionLocal()
    result = db.execute(text("SELECT version();"))
    print(" Connected to:", result.fetchone()[0])
    db.close()

if __name__ == "__main__":
    test_postgres()
