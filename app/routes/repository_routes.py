from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
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
def create_repository(repo_data=RepositoryCreate , db: Session = Depends(get_db), current_user: User = Depends(get_current_user_from_cookies) ):
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