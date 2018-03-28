__author__ = 'Keith Byrne'

from app.database import db, DeclarativeBase


class Group(db.Model, DeclarativeBase):
    name = db.Column(db.String(200))