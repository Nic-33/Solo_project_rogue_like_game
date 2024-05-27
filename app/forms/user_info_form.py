from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectMultipleField
from wtforms.validators import DataRequired, Email, ValidationError

class UserInfoForm(FlaskForm):
    wins = IntegerField(validators=[DataRequired()])
    lose = IntegerField(validators=[DataRequired()])
    battles = IntegerField(validators=[DataRequired()])
