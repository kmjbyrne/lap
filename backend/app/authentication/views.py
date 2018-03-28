import jwt
import base64

from functools import wraps
from datetime import datetime
from datetime import timedelta

from werkzeug.datastructures import MultiDict
from flask import current_app
from flask import jsonify
from flask import g
from flask import json
from flask import request
from flask import jsonify

from app.authentication.decorators import check_request_token, encode_auth_token
from app.users.models import User
from app.users.forms import UserForm
from app.authentication import authentication


@authentication.route('/api/authenticate', methods=['POST'])
def authenticate():
    payload = json.loads(request.data)
    user = User.get_by_username(payload.get('username'))
    if not user:
        return jsonify(message='Username / Email invalid. User not registered', code=401), 401
    verified = user.verify_password(payload.get('password'))
    if not verified:
        return jsonify(message='Invalid Username / Password', code=401), 401
    auth_token = encode_auth_token(user.id)
    return jsonify(message='Valid', code=200, token=auth_token.decode('utf-8')), 200


@authentication.route('/api/register', methods=['POST'])
def register():
    payload = json.loads(request.data)
    # Initialise and prepare the new user for persistence
    user = User.get_by_username_or_email(payload.get('username'), payload.get('email'))
    if user:
        message = ''
        # Means we have an integrity conflict
        if user.email == payload.get('email'):
            message = 'Email already registered'
        elif user.username == payload.get('username'):
            message = 'Username already exists'
        return jsonify(message=message, code=409), 409

    user_form = UserForm(MultiDict(payload))
    user = User()
    user.username = payload.get('username')
    user.email = payload.get('email')
    user.password = user.encrypt_password(payload.get('password'))
    user.registered = datetime.utcnow()
    user.persist()
    return jsonify(message='User successfully registered. You can now log in!', code=201), 201


@authentication.route('/api/authenticate/confirm', methods=['GET'])
def confirm_authentication():
    status = check_request_token()
    if not status.get('user'):
        return jsonify(message='Credentials invalid', code=401), 403
    return jsonify(message='Valid credentials', code=200), 200