from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectMultipleField
from wtforms.validators import DataRequired, Email, ValidationError

class UseableItemForm(FlaskForm):
    useable_inv = StringField(validators=[DataRequired()])
