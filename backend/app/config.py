import os


class Config(object):
    SITE_ADMIN = 'test@nytlex.com'
    SERVICE_ADDRESS = 'test@nytlex.com'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = False
    TESTING = False
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    AUTH_TOKEN_EXPIRY = 10000


class ReleaseConfig(Config):
    SERVER_NAME = 'bns.com'
    SITE_ADMIN = 'look@bns.com'
    DEPLOYMENT_HOSTNAME = 'http://bns.com'
    RUN_ENVIRONMENT = 'RELEASE'
    NAME = "Release Configuration"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    BOOKING_RATE_LIMITS = '1/minute'


class DevelopmentConfig(Config):
    SITE_ADMIN = 'test@nytlex.com'
    RUN_PORT = 5000
    DEPLOYMENT_HOSTNAME = '127.0.0.1:{}'.format(RUN_PORT)
    RUN_ENVIRONMENT = 'DEV'
    MAIL_SERVER = 'smtp1r.cp.blacknight.com'
    MAIL_PORT = 25
    NAME = "Development Configuration"
    HOST = '127.0.0.1'
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    BOOKING_RATE_LIMITS = '1/minute'


class TestingConfig(Config):
    SERVER_NAME = 'Testing'
    RUN_PORT = 5000
    RUN_ENVIRONMENT = 'TEST'
    MAIL_SERVER = 'smtp1r.cp.blacknight.com'
    DEPLOYMENT_HOSTNAME = '127.0.0.1:{}'.format(RUN_PORT)
    NAME = "Testing/Staging Configuration"
    PORT = 5000
    HOST = '0.0.0.0'
    DEBUG = True
    TESTING = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    BOOKING_RATE_LIMITS = '5 per minute'
    BOOKING_RATE_COUNT = 5