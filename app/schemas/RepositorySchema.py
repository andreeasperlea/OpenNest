from datetime import datetime

from pydantic import BaseModel


class RepositoryBase(BaseModel):
    name: str
    description: str
    is_private: bool = False

class RepositoryCReate(BaseModel):
    pass

class RepositoryOut(RepositoryBase):
    id: int
    owner_id:int
    created_at: datetime
    class Config:
        orm_mode = True
