from sqlalchemy import Column, Integer, ForeignKey, Text, String, TIMESTAMP, func, CheckConstraint

from app.database import Base

class Pull_requests(Base):
    __tablename__ = 'pull_requests'
    id = Column(Integer, primary_key=True)
    repository_id = Column(Integer, ForeignKey('repositories.id'), nullable=False,ondelete='CASCADE')
    author_id=Column(Integer, ForeignKey('users.id'), nullable=False,ondelete='CASCADE')
    title=Column(Text, nullable=False)
    description=Column(Text)
    status=Column(String(100), nullable=False)
    created_at=Column(TIMESTAMP, server_default=func.now())

    __table_args__ = (
        CheckConstraint("status IN ('open', 'closed', 'merged')", name='validstatuses', default='open'),
    )
