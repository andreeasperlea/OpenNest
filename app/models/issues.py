from sqlalchemy import Column, Integer, ForeignKey, Text, Boolean, TIMESTAMP, func
from sqlalchemy.orm import relationship
from app.database import Base

class Issue(Base):
    __tablename__ = 'issues'

    id = Column(Integer, primary_key=True)
    repository_id = Column(Integer, ForeignKey('repositories.id', ondelete="CASCADE"))
    author_id = Column(Integer, ForeignKey('users.id', ondelete="CASCADE"))
    title = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    is_open = Column(Boolean, nullable=False, default=True)
    created_at = Column(TIMESTAMP, server_default=func.now())

    repository = relationship("Repository", back_populates="issues")
