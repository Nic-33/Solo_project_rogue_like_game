from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User_info
from app.forms import UserInfoForm

user_info_routes = Blueprint('user_info', __name__)

@user_info_routes.route('/', methods=['GET'])
def get_user_info():
    user_id = current_user.to_dict()['id']
    info = User_info.query.get(user_id)
    return info.to_dict()

@user_info_routes.route('/', methods=['PUT'])
def update_user_info_inv():
    form = UserInfoForm()
    user_id = current_user.to_dict()['id']
    userInfo = User_info.query.get(user_id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        userInfo.wins = form.wins.data
        userInfo.lose = form.lose.data
        userInfo.battle = form.battle.data
        db.session.commit()
        return userInfo.to_dict()
    print(form.errors)
    return form.errors, 401
