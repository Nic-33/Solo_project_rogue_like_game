from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Character_info as Char, Gear, Inventory as Inv
from app.forms import CharForm

char_routes = Blueprint('char', __name__)

@char_routes.route('/', methods=['GET'])
def get_all_user_char():
    user_id = current_user.to_dict()['id']
    chars = Char.query.filter(Char.user_id==user_id).all()
    # print({'runs': [run.to_dict() for run in runs]})
    return {'char': [char.to_dict() for char in chars]}

@char_routes.route('/<int:char_id>', methods=['GET'])
@login_required
def get_a_char(char_id):
    user_id = current_user.to_dict()['id']
    char = Char.query.get(char_id).to_dict()
    if user_id == char['user_id']:
        return char
    else:
        return {'Error': 'item not found'}, 404

@char_routes.route('/', methods=['POST'])
@login_required
def create_char():
    form = CharForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_inv = Inv(
            inv = '{"head":[], "chest":[], "right":[], "left":[]}'
        )
        new_gear = Gear(
            head = 0,
            chest = 0,
            right = 0,
            left = 0
        )
        db.session.add(new_inv)
        db.session.add(new_gear)
        db.session.commit()
        new_char = Char(
            user_id=current_user.to_dict()['id'],
            inv_id = new_inv.id,
            gear_id = new_gear.id,
            stats = ""
        )
        db.session.add(new_char)
        db.session.commit()
        return new_char.to_dict()

@char_routes.route('/<int:char_id>',methods=['PUT'])
@login_required
def update_char(char_id):
    form = CharForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user_id = current_user.to_dict()['id']
    char_info = Char.query.get(char_id)
    char = char_info.get_gear_inv()
    if user_id == char['user_id']:
        if form.validate_on_submit():
            char_info.stats = form.stats.data
            db.session.commit()
            return char_info.to_dict()
        print(form.errors)
        return form.errors, 401
    else:
        return {'Error': 'item not found'}, 404

@char_routes.route('/<int:char_id>', methods=['DELETE'])
@login_required
def delete_char(char_id):
    user_id = current_user.to_dict()['id']
    char_info = Char.query.get(char_id)
    char = char_info.get_gear_inv()
    if user_id == char['user_id']:
        gear = Gear.query.get(char['gear_id'])
        inv = Inv.query.get(char['inv'])
        db.session.delete(gear)
        db.session.delete(inv)
        db.session.delete(char_info)
        db.session.commit()
        return {'Delete': "successful"}, 200
    else:
        return {'Error': 'item not found'}, 404
