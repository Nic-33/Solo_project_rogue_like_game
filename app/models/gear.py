from .db import db, environment, SCHEMA, add_prefix_for_prod

class Gear (db.Model):
    __tablename__ = 'gear'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    head = db.Column(db.Integer(), nullable=False)
    chest = db.Column(db.Integer(), nullable=False)
    left = db.Column(db.Integer(), nullable=False)
    right = db.Column(db.Integer(), nullable=False)

    char_info = db.relationship("Character_info", back_populates="gear")



    def to_dict(self):
        return {
            'id': self.id,
            'head': self.head,
            'chest': self.chest,
            'left': self.left,
            'right': self.right
        }
