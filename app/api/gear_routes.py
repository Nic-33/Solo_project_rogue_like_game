from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Gear, Character_info
from app.forms import GearForm

gear_routes = Blueprint('gear', __name__)

@gear_routes.route('/<int:char_id>', methods=['GET'])
def get_gear_char(char_id):
    user_id = current_user.to_dict()['id']
    char_info = Character_info.query.get(char_id)
    char = char_info.get_gear_id()
    if user_id == char['user_id']:
        gear = Gear.query.get(char['gear_id'])
        return gear.to_dict()
    else:
        return {'Error': 'item not found'}, 404

@gear_routes.route('/<int:char_id>', methods=['PUT'])
def Update_gear(char_id):
    form = GearForm()
    user_id = current_user.to_dict()['id']
    char_info = Character_info.query.filter(Character_info.id==char_id).first()
    char = char_info.get_gear_id()
    if user_id == char['user_id']:
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            gear = Gear.query.get(char['gear_id'])
            gear.head = form.head.data
            gear.chest = form.chest.data
            gear.right = form.right.data
            gear.left = form.left.data
            db.session.commit()
            return gear.to_dict()
        print(form.errors)
        return form.errors, 401
    else:
        return {'Error': 'item not found'}, 404

@gear_routes.route('/<int:char_id>', methods=['DELETE'])
def delete_gear_char(char_id):
    user_id = current_user.to_dict()['id']
    char_info = Character_info.query.get(char_id)
    char = char_info.get_gear_id()
    if user_id == char['user_id']:
        gear = Gear.query.get(char['gear_id'])
        db.session.delete(gear)
        db.session.commit()
        return {'Delete': "successful"}, 200
    else:
        return {'Error': 'item not found'}, 404
