from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import deferred
from werkzeug.security import check_password_hash, generate_password_hash

from app.database import db, DeclarativeBase
from app.tasks.models import Task


class User(db.Model, DeclarativeBase):
    __tablename__ = 'user'
    username = db.Column(db.String(120), unique=True)
    password = deferred(db.Column(db.Text()))
    email = db.Column(db.String(120), unique=True)
    forename = db.Column(db.String(120))
    surname = db.Column(db.String(120))
    registered = db.Column(db.DateTime)

    tasks = db.relationship('Task', lazy='dynamic')

    @staticmethod
    def get_by_username(username):
        user = User.handle_request(User.query.filter_by(username=username).first)
        return user

    @staticmethod
    def get_by_id(_id, restrict_to=None):
        if restrict_to:
            response = User.session_query(
                User.query([i for i in restrict_to]).filter_by(id=_id).first
            )
            return response
        return User.handle_request(User.query.filter_by(id=_id).first)

    @hybrid_property
    def number_of_tasks(self):
        return Task.query.filter_by(user_id=self.id).count()

    @staticmethod
    def get_by_username_or_email(username, email):
        return User.handle_request(
            User.query.filter(
                (User.username.ilike(username)) | (User.email.ilike(email))
            ).first
        )

    def json(self):
        response = self.to_dictionary()
        response['tasks'] = self.number_of_tasks
        if response.get('password'):
            del response['password']
        return response

    def verify_password(self, plain_text_password):
        return check_password_hash(self.password, plain_text_password)

    def encrypt_password(self, plain_text_password):
        encrypted_password = generate_password_hash(plain_text_password)
        self.password = encrypted_password
        return encrypted_password