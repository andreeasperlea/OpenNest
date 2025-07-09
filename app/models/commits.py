from pymysql import TIMESTAMP
from sqlalchemy import Column, Integer, ForeignKey, Text, String, func

from app.database import Base

class Commit(Base):
    __tablename__ = 'commits'

    id = Column(Integer, primary_key=True)
    repository_id=Column(Integer, ForeignKey('repositories.id', ondelete="CASCADE"), primary_key=True)
    author_id=Column(Integer, ForeignKey('users.id', ondelete="CASCADE"), primary_key=True)
    message=Column(Text, nullable=False)
    commit_hash=Column(String(40), nullable=False, unique=True)
    commited_at=Column(TIMESTAMP, nullable=False, server_default=func.now())

