from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class CharForm(FlaskForm):
    stats = StringField('Stats', validators=[DataRequired()])
