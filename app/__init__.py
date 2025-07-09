from app.database import engine, Base
from app.models import users  # this imports the User model so Base knows it

# Create all tables
Base.metadata.create_all(bind=engine)

print("✅ Tables created successfully.")
