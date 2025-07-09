from sqlalchemy import Column, ForeignKey, Integer, String, Text, Boolean, TIMESTAMP, func

from app.database import Base

class Repository(Base):
    __tablename__ = 'repositories'
    id = Column(Integer, primary_key=True, autoincrement=True)
    owner_id=Column(Integer, ForeignKey('users.id'), ondelete='CASCADE')
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    is_private = Column(Boolean, nullable=False, default=False)
    created_at=Column(TIMESTAMP, server_default=func.now())
