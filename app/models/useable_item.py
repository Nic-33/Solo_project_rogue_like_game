from .db import db, environment, SCHEMA, add_prefix_for_prod

class Useable_item (db.Model):
    __tablename__ = 'useable_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey("users.id"),nullable=False)
    useable_inv = db.Column(db.String(), nullable=False)

    users = db.relationship("User", back_populates="useable_items")
    runs = db.relationship("Run", back_populates='useable_items')



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'use_item_id': self.useable_inv,
        }
