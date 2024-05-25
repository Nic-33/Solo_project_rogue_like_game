from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectMultipleField
from wtforms.validators import DataRequired, Email, ValidationError

class RunForm(FlaskForm):
    use_item_id = IntegerField(validators=[DataRequired()])
    character_id = IntegerField(validators=[DataRequired()])
    seed = StringField('seed', validators=[DataRequired()])
