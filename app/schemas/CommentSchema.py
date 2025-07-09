from datetime import datetime

from pydantic import BaseModel, root_validator


class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    author_id: int
    issue_id: int
    pull_request_id: int

    @root_validator
    def check_only_one_target(cls, values):
        issue, pr = values.get("issue_id"), values.get("pull_request_id")
        if (issue is None and pr is None) or (issue is not None and pr is not None):
            raise ValueError("Exactly one of issue_id or pull_request_id must be provided")
        return values

class CommentOut(CommentBase):
    id: int
    created_at: datetime
    author_id: int
    issue_id: int
    pull_request_id: int
    class Config:
        orm_mode = True