from sqlalchemy import Column, Integer, ForeignKey, Text, String, TIMESTAMP, func
from sqlalchemy.orm import relationship
from app.database import Base

class Commit(Base):
    __tablename__ = 'commits'

    id = Column(Integer, primary_key=True)
    repository_id = Column(Integer, ForeignKey('repositories.id', ondelete="CASCADE"))
    author_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    message = Column(Text, nullable=False)
    commit_hash = Column(String(40), nullable=False, unique=True)
    committed_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    content=Column(Text, nullable=True)
    path=Column(Text, nullable=True)

    repository = relationship("Repository", back_populates="commits")
    author = relationship("User")
