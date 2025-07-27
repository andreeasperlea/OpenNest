from app.database import engine, Base
from app.models import users
Base.metadata.create_all(bind=engine)
