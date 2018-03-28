import sys

from flask_script import Manager
from flask.ext.migrate import Migrate, MigrateCommand
from flask_sqlalchemy import SQLAlchemy

from app.database import db
from app import create_app

from app.tasks.models import Task
from app.users.models import User

if sys.argv[3]:
    app = create_app(str(sys.argv[3]))
    del sys.argv[3]
else:
    app = create_app()

migrate = Migrate(app, db, directory='migrations')
manager = Manager(app)
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()