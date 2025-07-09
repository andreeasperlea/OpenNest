from datetime import datetime

from pydantic import BaseModel


class CommitBase(BaseModel):
    message: str

class CommitCreate(CommitBase):
    repository_id:int
    author_id: int

class CommitOut(CommitBase):
    id: int
    repository_id:int
    author_id: int
    created_at: datetime
    class Config:
        orm_mode = True