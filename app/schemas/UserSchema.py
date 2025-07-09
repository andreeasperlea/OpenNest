from datetime import datetime

from pydantic import BaseModel, EmailStr
print("🚨 LOADING: schemas/UserSchema.py")

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserOut(BaseModel):
    email: EmailStr
    username: str
    id:int
    created_at: datetime

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str