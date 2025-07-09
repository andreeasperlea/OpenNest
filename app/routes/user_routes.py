from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal, get_db
from app.models.users import User
from app.schemas.UserSchema import UserCreate, UserOut, UserLogin
from app import utils
from app.utils import create_access_token

router = APIRouter()
print("🚨 LOADING: routes/user_routes.py")
@router.post("/signup", response_model=UserOut)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = utils.hash_password(user.password)
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/sign-in", response_model=UserCreate)
def signin(user: UserLogin, db: Session=Depends(get_db)):
    existing_user=db.query(User).filter(User.email == user.email).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="Invalid credentials")
    token=create_access_token({"user_id": existing_user.id})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/debug-db-url")
def debug_db_url():
    from app.database import engine
    return {"url": str(engine.url)}