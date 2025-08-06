from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class CommitBase(BaseModel):
    message: str
    path: str
    content: Optional[str]=None

class CommitCreate(CommitBase):
    pass

class CommitOut(CommitBase):
    id: int
    repository_id:int
    author_id: int
    created_at: datetime
    class Config:
        orm_mode = True