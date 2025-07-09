from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class PullRequestBase(BaseModel):
    title: str
    description: Optional[str] = None

class PullRequestCreate(PullRequestBase):
    author_id: int
    repository_id:int

class PullRequestOut(PullRequestBase):
    id: int
    author_id: int
    repository_id: int
    created_at: datetime
    is_open: bool
    class Config:
        orm_mode = True
