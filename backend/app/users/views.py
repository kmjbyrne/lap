__author__ = 'Keith Byrne'

from flask import g
from flask import jsonify
from flask import request

from app.authentication.decorators import check_request_token
from app.users import users
from app.users.models import User


@users.route('/api/user', methods=['GET'])
@users.route('/api/user/<user_id>', methods=['GET'])
@check_request_token
def get_user_data(user_id=None):
    user = User.get_by_id(g.user)
    return jsonify(user=user.json(), code=200), 200


@users.route('/api/user/<user_id>/summary', methods=['GET'])
def get_user_data_set(user_id):
    params = request.query_string
    # Depending on query set type we marshall and return different sets of the user data
    user = User.get_by_id(user_id)
    return jsonify(user.json())
