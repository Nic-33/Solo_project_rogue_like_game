from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Run

run_routes = Blueprint('run', __name__)


@run_routes.route('/', methods=['GET'])
def get_all_user_runs():
    user_id = current_user.to_dict()['id']
    runs = Run.query.filter(Run.user_id==user_id).all()
    print({'runs': [run.to_dict() for run in runs]})
    return {'runs': [run.to_dict() for run in runs]}
