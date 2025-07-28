from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class RepositoryBase(BaseModel):
    name: str
    description: str
    is_private: bool = False

class RepositoryCreate(BaseModel):
    name:str
    description:Optional[str]=""
    is_private:bool

class RepositoryOut(RepositoryBase):
    id: int
    owner_id:int
    created_at: datetime
    class Config:
        orm_mode = True
