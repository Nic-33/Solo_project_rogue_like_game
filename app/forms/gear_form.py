from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectMultipleField
from wtforms.validators import DataRequired, Email, ValidationError

class GearForm(FlaskForm):
    head = IntegerField(validators=[DataRequired()])
    chest = IntegerField(validators=[DataRequired()])
    right = IntegerField(validators=[DataRequired()])
    left = IntegerField(validators=[DataRequired()])
