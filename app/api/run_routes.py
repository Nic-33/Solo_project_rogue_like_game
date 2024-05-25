from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Run
from app.forms import RunForm

run_routes = Blueprint('run', __name__)


@run_routes.route('/', methods=['GET'])
def get_all_user_runs():
    user_id = current_user.to_dict()['id']
    runs = Run.query.filter(Run.user_id==user_id).all()
    # print({'runs': [run.to_dict() for run in runs]})
    return {'runs': [run.to_dict() for run in runs]}

@run_routes.route('/<int:run_id>', methods=['GET'])
@login_required
def get_a_run(run_id):
    run = Run.query.get(run_id)
    return run.to_dict()

@run_routes.route('/', methods=["POST"])
@login_required
def create_a_run():
    form = RunForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_run = Run(
            user_id=current_user.to_dict()['id'],
            use_item_id=form.use_item_id.data,
            character_id=form.character_id.data,
            seed=form.seed.data
            )
        db.session.add(new_run)
        db.session.commit()
        return new_run.to_dict()
    print(form.errors)
    return form.errors, 401

@run_routes.route('/<int:run_id>', methods=['PUT'])
@login_required
def update_run(run_id):
    run = Run.query.get(run_id)
    form = RunForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        run.seed = form.seed.data
        db.session.commit()
        return run.to_dict()
    print(form.errors)
    return form.errors, 401

@run_routes.route('/<int:run_id>', methods=['DELETE'])
@login_required
def delete_run(run_id):
    run = Run.query.get(run_id)
    db.session.delete(run)
    db.session.commit()
    return {'Delete': "successful"}, 200
