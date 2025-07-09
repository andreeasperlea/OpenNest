from sqlalchemy import ForeignKey, Integer, Column, String, CheckConstraint

from app.database import Base

class Collaborator(Base):
    __tablename__ = 'collaborators'
    id = Column(Integer, ForeignKey('users.id', ondelete="CASCADE"), primary_key=True)
    repository_id = Column(Integer, ForeignKey('repositories.id', ondelete="CASCADE"), primary_key=True)
    role=Column(String(20), nullable=False)

    __table_args__ = (
        CheckConstraint("role IN ('read', 'write', 'admin')", name='validroles'),
    )
