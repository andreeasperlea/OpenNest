from datetime import datetime

from pydantic import BaseModel


class IssueBase(BaseModel):
    title: str
    description: str

class IssueCreate(IssueBase):
    pass;

class IssuePut(IssueBase):
    id: int
    repository_id: int
    owner_id: int
    created_at: datetime
    is_open: bool

    class Config:
        orm_mode = True