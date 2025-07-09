import os
from datetime import timedelta, datetime

from jose import jwt
from passlib.context import CryptContext

pwd_context=CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = ("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta:timedelta=None):
    to_encode = data.copy()
    expire = datetime.utcnow() + {expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)}
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)



