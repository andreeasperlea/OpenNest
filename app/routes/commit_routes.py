import hashlib
from http.client import HTTPException

from fastapi import APIRouter, Form, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.commits import Commit
from app.models.repositories import Repository
from app.models.users import User
from app.routes.user_routes import get_current_user_from_cookies
from app.schemas.CommitSchema import CommitCreate

commit_router=APIRouter()

@commit_router.post("/repositories/{repo_id}/commits")
def create_commit(
        repo_id: int,
        message:str=Form(...),
        path:str=Form(...),
        content:str=Form(None),
        file:UploadFile=File(None),
        db:Session=Depends(get_db),
        current_user:User=Depends(get_current_user_from_cookies)
):
    repo = db.query(Repository).filter(
        Repository.id == repo_id,
        Repository.owner_id == current_user.id
    ).first()

    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")

    if file:
        file_data=file.file.read().decode("utf-8")
    elif content:
        file_data=content
    else:
        raise HTTPException(status_code=400, detail="No content provided")

    commit_hash = hashlib.sha1((message + file_data + path).encode()).hexdigest()

    new_commit = Commit(
        repository_id=repo.id,
        author_id=current_user.id,
        message=message,
        path=path,
        content=file_data,
        commit_hash=commit_hash
    )
    db.add(new_commit)
    db.commit()
    db.refresh(new_commit)

    return {"message":"Commit created", "commit_id":new_commit.id}
