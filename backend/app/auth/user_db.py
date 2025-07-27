from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

fake_users_db = {
    "user1": {
        "username": "user1",
        "hashed_password": get_password_hash("pass1"),
        "role": "editor"
    },
    "user2": {
        "username": "user2",
        "hashed_password": get_password_hash("pass2"),
        "role": "viewer"
    }
}

def get_user(db, username: str):
    if username in db:
        return db[username]
    return None