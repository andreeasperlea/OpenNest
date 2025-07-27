from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from app.database import SessionLocal, get_db
from app.models.users import User
from app.schemas.UserSchema import UserCreate, UserOut, UserLogin
from app import utils
from app.utils import create_access_token, SECRET_KEY, ALGORITHM

router = APIRouter()
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

@router.post("/sign-in")
def signin(user: UserLogin, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if not existing_user or not utils.verify_password(user.password, existing_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": existing_user.id})
    response = JSONResponse({"message": "Login successful"})
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,
        samesite="Lax",
        max_age=3600
    )
    return response


def get_current_user_from_cookies(request: Request, db: Session = Depends(get_db))->User:
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    try:
        payload= jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id=payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.get("/me", response_model=UserOut)
def get_me(current_user: User =Depends(get_current_user_from_cookies)):
    return current_user

@router.post("/logout")
def logout():
    response=JSONResponse(content={"message":"Logout successful"})
    response.delete_cookies("access_token")
    return response
