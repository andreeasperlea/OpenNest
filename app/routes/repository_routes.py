from http.client import HTTPException

from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models.repositories import Repository
from app.models.users import User
from app.routes.user_routes import get_current_user_from_cookies
from app.schemas.RepositorySchema import RepositoryCreate

repo_router = APIRouter()

@repo_router.get("/repositories")
def get_my_repositories(current_user: User = Depends(get_current_user_from_cookies), db: Session = Depends(get_db)):
    repos=db.query(Repository).filter(Repository.owner_id == current_user.id).all()
    return repos

@repo_router.post("/create-repository")
def create_repository(repo_data: RepositoryCreate = Body(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user_from_cookies) ):
    new_repo = Repository(
        owner_id=current_user.id,
        name=repo_data.name,
        description=repo_data.description,
        is_private=repo_data.is_private,
    )
    db.add(new_repo)
    db.commit()
    db.refresh(new_repo)

    return new_repo

from sqlalchemy.orm import joinedload

@repo_router.get("/repositories/{repo_id}")
def get_repository(repo_id: int, current_user: User = Depends(get_current_user_from_cookies), db: Session = Depends(get_db)):
    repo = db.query(Repository)\
        .options(
            joinedload(Repository.commits),
            joinedload(Repository.issues),
            joinedload(Repository.pull_requests)
        )\
        .filter(
            Repository.id == repo_id,
            Repository.owner_id == current_user.id
        )\
        .first()

    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")

    return {
        "id": repo.id,
        "name": repo.name,
        "description": repo.description,
        "created_at": repo.created_at,
        "is_private": repo.is_private,
        "commits": [
            {
                "id": c.id,
                "message": c.message,
                "commit_hash": c.commit_hash,
                "committed_at": c.committed_at,
                "path":c.path,
                "content":c.content,
            } for c in repo.commits
        ],
        "issues": [
            {
                "id": i.id,
                "title": i.title,
                "description": i.description,
                "is_open": i.is_open,
                "created_at": i.created_at,
            } for i in repo.issues
        ],
        "pull_requests": [
            {
                "id": pr.id,
                "title": pr.title,
                "description": pr.description,
                "status": pr.status,
                "created_at": pr.created_at,
            } for pr in repo.pull_requests
        ]
    }

