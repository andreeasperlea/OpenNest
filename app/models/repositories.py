from sqlalchemy import Column, Integer, ForeignKey, String, Text, Boolean, TIMESTAMP, func
from sqlalchemy.orm import relationship
from app.database import Base

# Import related models
from app.models.commits import Commit
from app.models.issues import Issue
from app.models.pull_requests import PullRequest

class Repository(Base):
    __tablename__ = 'repositories'

    id = Column(Integer, primary_key=True, autoincrement=True)
    owner_id = Column(Integer, ForeignKey('users.id'))
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    is_private = Column(Boolean, nullable=False, default=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    commits = relationship('Commit', back_populates='repository', cascade='all, delete')
    issues = relationship('Issue', back_populates='repository')
    pull_requests = relationship('PullRequest', back_populates='repository')
