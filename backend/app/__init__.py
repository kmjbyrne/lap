from flask import Flask
from flask_cors import CORS

from app.database import db
from app.tasks import tasks
from app.authentication import authentication
from app.users import users


def verify_release_configuration():
    """
    A pre deployment sanity check to ensure that the minimal required configuration mappings
    are present within the release deploy/config.cfg file.

    Function will look for core config members such as secret key, salts etc...

    :return True / False: True or False if verified or unverified
    :rtype bool
    """
    return False


def create_app(env='DEV'):
    state = Flask(__name__, instance_relative_config=True)
    CORS(state, resources={
        r'/*': {'origins': '*'}
    })
    config_path = None
    if env == 'DEV':
        config_path = 'app.config.DevelopmentConfig'
    elif env == 'TEST':
        config_path = 'app.config.TestingConfig'
    elif env == 'RELEASE':
        config_path = 'app.config.ReleaseConfig'

    state.config.from_object(config_path)

    state.config.from_pyfile('config.cfg', silent=True)
    db.init_app(state)

    # mail.init_app(state)
    # limiter.init_app(state)

    # here we can apply the app level authorization control. Rather than in each route.
    # all tasks will require security, as will most component data. Login being the exception.

    state.register_blueprint(tasks)
    state.register_blueprint(authentication)
    state.register_blueprint(users)
    # state.register_blueprint(admin_controller, url_prefix='/admin')
    # state.register_blueprint(error_handler)

    return state