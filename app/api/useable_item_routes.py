from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Useable_item
from app.forms import UseableItemForm

usable_routes = Blueprint('use_inv', __name__)

@usable_routes.route('/', methods=['GET'])
def get_users_inv():
    user_id = current_user.to_dict()['id']
    useables = Useable_item.query.filter(Useable_item.user_id==user_id).all()
    return {'useable_Items': [item.to_dict() for item in useables]}

@usable_routes.route('/', methods=['PUT'])
def update_useable_inv():
    form = UseableItemForm()
    user_id = current_user.to_dict()['id']
    useables = Useable_item.query.get(user_id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        useables.useable_inv = form.useable_inv.data
        db.session.commit()
        return useables.to_dict()
    print(form.errors)
    return form.errors, 401
