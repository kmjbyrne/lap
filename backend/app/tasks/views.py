import datetime

from flask import jsonify
from flask import request
from flask import json
from flask import g

from app.authentication.decorators import check_request_token

from app.tasks.models import Task, TaskState
from app.tasks import tasks


@tasks.route('/api/tasks')
@check_request_token
def all_tasks():
    params = request.args
    # We may need to return a partial response (subset of all task data)
    all_task_items = Task.get_by_user_id(g.user)
    if params.get('format') and params['format'] == 'partial':
        return jsonify([i.json('partial') for i in all_task_items])
    return jsonify([i.json() for i in all_task_items])


@tasks.route('/api/task', methods=['POST'])
@check_request_token
def get_user():
    payload = json.loads(request.data)
    task_item = Task()
    task_item.label = payload.get('task')
    task_item.created = datetime.datetime.now()
    task_item.user_id = g.user
    task_item.persist()
    return jsonify(task=task_item.id, code=201), 201


@tasks.route('/api/task/<task_id>', methods=['GET', 'DELETE'])
@check_request_token
def get_task_by_id(task_id):
    task_item = Task.get_by_id(task_id)
    if not task_item:
        return jsonify(message='Resource not found'), 404
    if request.method == 'DELETE':
        task_item.deleted = 'Y'
        task_item.persist()
        return jsonify(message='Resource deleted'), 204
    task_item = Task.get_by_id(task_id)
    return jsonify(task_item.json())


@tasks.route('/api/task/<task_id>/<state>', methods=['PUT'])
@check_request_token
def update_task_state(task_id, state):
    task_item = Task.get_by_id(task_id)
    task_item.state = TaskState.get_by_state(state)
    task_item.completed = datetime.datetime.now()
    task_item.persist()
    return jsonify(href='/api/task/{}'.format(task_item.id), status=200)