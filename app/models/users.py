from sqlalchemy import Column, Integer, String, TIMESTAMP, func

from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username=Column(String(50), nullable=False)
    hashed_password = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    created_at=Column(TIMESTAMP, server_default=func.now())
    

