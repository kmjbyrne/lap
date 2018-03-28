__author__ = 'Keith Byrne'

import jwt
import base64

from functools import wraps
from datetime import datetime, timedelta

from flask import request
from flask import current_app
from flask import jsonify
from flask import g


def encode_auth_token(user_id):
    try:
        payload = {
            'exp': datetime.utcnow() + timedelta(hours=12),
            'iat': datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(
            payload,
            current_app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
    except Exception as e:
        return e


def decode_auth_token(auth_token):
    try:
        payload = jwt.decode(auth_token, current_app.config.get('SECRET_KEY'))
        return {
            'user': payload['sub'],
            'access': True
        }
    except jwt.ExpiredSignatureError:
        return 'Auth token expired. Please log in again'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again'


def confirm_token():
    token = request.headers.get('AUTHORIZATION').split(' ')[1]
    # token = base64.standard_b64decode(token).decode('utf-8')
    return decode_auth_token(token)


def check_request_token(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        auth_token = confirm_token()
        if type(auth_token) == str:
            return jsonify(message='Token is invalid', code=403), 403
        g.user = auth_token.get('user')
        return func(*args, **kwargs)
    return decorated