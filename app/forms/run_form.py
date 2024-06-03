from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectMultipleField
from wtforms.validators import DataRequired, Email, ValidationError

class RunForm(FlaskForm):
    char_1 = StringField(validators=[DataRequired()])
    char_2 = StringField()
    char_3 = StringField()
    seed = StringField('seed', validators=[DataRequired()])
