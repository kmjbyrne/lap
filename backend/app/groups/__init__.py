from flask import Blueprint

tasks = Blueprint(
    'groups',
    __name__,
)

from app.groups import views