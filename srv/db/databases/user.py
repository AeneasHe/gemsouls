import wpath
from db.connection import client
from db.table import Table

db = client.gemsouls


class Gemsouls:
    user = Table(db, "user")


gemsouls = Gemsouls()
