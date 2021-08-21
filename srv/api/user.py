import wpath
from app import *

from fastapi import Depends, HTTPException, status

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

fake_users_db = {
    "luna": {
        "username": "luna",
        "full_name": "luna",
        "email": "johndoe@example.com",
        "hashed_password": "123456",
        "disabled": False,
    },
    "aeneas": {
        "username": "aeneas",
        "full_name": "aeneas",
        "email": "alice@example.com",
        "hashed_password": "123456",
        "disabled": True,
    },
}


def fake_hash_password(password: str):
    # return "fakehashed" + password

    return password


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None


class UserInDB(User):
    hashed_password: str


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def fake_decode_token(token):
    user = get_user(fake_users_db, token)
    return user


async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


class FormData(BaseModel):
    password: str
    username: str


@app.post("/token")
async def login(form_data: FormData):

    wpath.print_r(form_data)

    # 查询用户信息
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=400, detail="User not exist")

    # 用户对象
    user = UserInDB(**user_dict)

    hashed_password = fake_hash_password(form_data.password)

    wpath.print_y(f"{hashed_password}, {user.hashed_password}")

    if not hashed_password == user.hashed_password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {"access_token": user.username, "token_type": "bearer"}


@app.get("/user/me")
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user