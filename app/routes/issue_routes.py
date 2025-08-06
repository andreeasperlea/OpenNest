from http.client import HTTPException

from fastapi import APIRouter
from fastapi.params import Depends, Body
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.issues import Issue
from app.models.repositories import Repository
from app.models.users import User
from app.routes.user_routes import get_current_user_from_cookies
from app.schemas.IssuesSchema import IssueCreate
from app.schemas.UserSchema import UserOut

issue_router=APIRouter()

@issue_router.post("/repositories/{repo_id}/issues")
async def create_issue(repo_id: int, issue: IssueCreate = Body(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user_from_cookies)):
    repo=db.query(Repository).filter_by(id=repo_id, owner_id=current_user.id).first()
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")

    new_issue = Issue(
        repository_id=repo_id,
        title=issue.title,
        description=issue.description,
        is_open=True
    )

    db.add(new_issue)
    db.commit()
    db.refresh(new_issue)
    return new_issue