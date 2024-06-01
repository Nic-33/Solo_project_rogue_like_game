from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectMultipleField
from wtforms.validators import DataRequired, Email, ValidationError

class RunForm(FlaskForm):
    use_item_id = IntegerField(validators=[DataRequired()])
    char_1 = IntegerField(validators=[DataRequired()])
    char_2 = IntegerField()
    char_3 = IntegerField()
    seed = StringField('seed', validators=[DataRequired()])
