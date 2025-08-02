from sqlalchemy import Column, Integer, ForeignKey, Text, String, TIMESTAMP, func, CheckConstraint
from sqlalchemy.orm import relationship
from app.database import Base

class PullRequest(Base):
    __tablename__ = 'pull_requests'

    id = Column(Integer, primary_key=True)
    repository_id = Column(Integer, ForeignKey('repositories.id', ondelete="CASCADE"), nullable=False)
    author_id = Column(Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    title = Column(Text, nullable=False)
    description = Column(Text)
    status = Column(String(100), nullable=False, default='open')
    created_at = Column(TIMESTAMP, server_default=func.now())

    repository = relationship("Repository", back_populates="pull_requests")

    __table_args__ = (
        CheckConstraint("status IN ('open', 'closed', 'merged')", name='valid_statuses'),
    )
