from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Inventory as Inv, Character_info
from app.forms import InvForm

inv_routes = Blueprint('inv', __name__)

@inv_routes.route('/<int:char_id>', methods=['GET'])
def get_inv_char(char_id):
    user_id = current_user.to_dict()['id']
    char_info = Character_info.query.get(char_id)
    char = char_info.get_gear_inv_id()
    if user_id == char['user_id']:
        inv = Inv.query.get(char['inv'])
        return inv.to_dict()
    else:
        return {'Error': 'item not found'}, 404

@inv_routes.route('/<int:char_id>', methods=['PUT'])
def Update_inv(char_id):
    form = InvForm()
    user_id = current_user.to_dict()['id']
    char_info = Character_info.query.get(char_id)
    char = char_info.get_gear_inv_id()
    if user_id == char['user_id']:
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            # print('form Valade!!!!!!!!!!!!!!!!',form.inv.data)
            inv = Inv.query.get(char['inv'])
            inv.inv = form.inv.data
            db.session.commit()
            return inv.to_dict()
        print(form.errors)
        return form.errors, 401
    else:
        return {'Error': 'item not found'}, 404

@inv_routes.route('/<int:char_id>', methods=['DELETE'])
def delete_inv_char(char_id):
    user_id = current_user.to_dict()['id']
    char_info = Character_info.query.get(char_id)
    char = char_info.get_gear_inv_id()
    if user_id == char['user_id']:
        inv = Inv.query.get(char['inv'])
        db.session.delete(inv)
        db.session.commit()
        return {'Delete': "successful"}, 200
    else:
        return {'Error': 'item not found'}, 404
