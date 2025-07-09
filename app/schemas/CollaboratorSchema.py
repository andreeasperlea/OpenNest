from typing import Literal

from pydantic import BaseModel
from UserSchema import UserOut
from RepositorySchema import RepositoryOut


class CollaboratorBase(BaseModel):
    role:Literal['reader', 'writer', 'admin']

class CollaboratorCreate(CollaboratorBase):
    user_id: int
    repository_id: int

class CollaboratorOut(CollaboratorBase):
    user_id: int
    repository_id: int

    class Config:
        orm_mode = True


class CollaboratorOutFull(CollaboratorOut):
    user: UserOut
    repository: RepositoryOut