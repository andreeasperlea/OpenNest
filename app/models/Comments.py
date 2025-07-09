from sqlalchemy import Column, Integer, ForeignKey, Text, TIMESTAMP, func, CheckConstraint

from app.database import Base

class Comments(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), ondelete='CASCADE')
    issue_id = Column(Integer, ForeignKey('issues.id'), ondelete='CASCADE')
    pull_request_id = Column(Integer, ForeignKey('pull_requests.id'), ondelete='CASCADE')
    content = Column(Text, nullable=False)
    created_at=Column(TIMESTAMP,server_default=func.now())

    __table_args__ = (
        CheckConstraint(
            "(issue_id IS NOT NULL AND pull_request_id IS NULL) OR "
            "(issue_id IS NULL AND pull_request_id IS NOT NULL)",
            name="check_comment_target"
        ),
    )
