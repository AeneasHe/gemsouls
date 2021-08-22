import wpath
from app import *

from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from pydantic import BaseModel

import db


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

    access_token = Authorize.create_access_token(
        subject=user.username, expires_time=3600 * 24 * 7
    )
    return {"access_token": access_token, "username": user.username}


@app.get("/user/me")
def user(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_user = Authorize.get_jwt_subject()

    # return {"username": current_user}

    user = db.gemsouls.user.find_one({"username": current_user})
    user.pop("_id")
    return user


@app.post("/user/register")
def user_register(user: User):

    # wpath.print_r(user)
    db.gemsouls.user.insert_one({"username": user.username, "password": user.password})

    return {"msg": "successs"}
