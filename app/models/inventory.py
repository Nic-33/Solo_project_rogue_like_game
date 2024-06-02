from .db import db, environment, SCHEMA, add_prefix_for_prod

class Inventory (db.Model):
    __tablename__ = 'inventory'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    inv = db.Column(db.String())

    char_info = db.relationship("Character_info", back_populates="inventory")



    def to_dict(self):
        return {

            'inventory': self.inv
        }
