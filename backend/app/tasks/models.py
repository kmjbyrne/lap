from flask import render_template
from flask import current_app

from app.database import db, DeclarativeBase, KeyBase


class Task(db.Model, DeclarativeBase):
    __tablename__ = 'task'
    label = db.Column(db.String(120))
    description = db.Column(db.Text())
    created = db.Column(db.DateTime)
    completed = db.Column(db.DateTime)
     # Foreign key definitions
    task_state_id = db.Column(db.Integer, db.ForeignKey('task_state.id'), nullable=True, default=1)
    task_priority_id = db.Column(db.Integer, db.ForeignKey('task_priority.id'), nullable=True, default=1)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    # Backref relationship definitions
    priority = db.relationship('TaskPriority', backref=db.backref('task', lazy='joined'))
    state = db.relationship('TaskState', backref=db.backref('task', lazy='joined'))

    @staticmethod
    def partial(user_id):
        return Task.query.filter_by(id=user_id).all()

    def json(self, format=None):
        if format == 'partial':
            return {'id': self.id, 'label': self.label, 'created': self.created}
        response = self.to_dictionary()
        response['state'] = self.state.to_dictionary()
        response['priority'] = self.priority.to_dictionary()
        return response

    @staticmethod
    def get_by_user_id(user_id):
        return Task.handle_request(Task.query.filter_by(user_id=user_id).all)

    def set_default_state(self):
        self.task_state_id = 2


class TaskPriority(db.Model, KeyBase):
    priority = db.Column(db.String(32))
    description = db.Column(db.String(200))


class TaskState(db.Model, KeyBase):
    __tablename__ = 'task_state'
    state = db.Column(db.String(32))
    description = db.Column(db.Text())

    @staticmethod
    def get_by_state(state):
        return TaskState.handle_request(TaskState.query.filter_by(state=state).first_or_404)