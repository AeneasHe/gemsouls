import wpath
import db

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from starlette.websockets import WebSocket


from pydantic import BaseModel
from typing import Optional

app = FastAPI()


class Form(BaseModel):
    sortby: Optional[str] = None
    order: Optional[int] = 1
    filter: Optional[dict] = None
    page: Optional[int] = 0
    limit: Optional[int] = 10