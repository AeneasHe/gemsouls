import wpath
from app import *

from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from pydantic import BaseModel


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


class User(BaseModel):
    username: str
    password: str


class Settings(BaseModel):
    authjwt_secret_key: str = "secret"


@AuthJWT.load_config
def get_config():
    return Settings()


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.message})


@app.post("/token")
async def login(user: User, Authorize: AuthJWT = Depends()):

    wpath.print_r(user)

    if user.username != "aeneas" or user.password != "123456":
        raise HTTPException(status_code=401, detail="Bad username or password")

    access_token = Authorize.create_access_token(subject=user.username)
    return {"access_token": access_token}


@app.get("/user/me")
def user(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_user = Authorize.get_jwt_subject()
    return {"username": current_user}