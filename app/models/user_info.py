from .db import db, environment, SCHEMA, add_prefix_for_prod

class User_info (db.Model):
    __tablename__ = 'user_info'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    if environment == 'production':
        id = db.Column(db.Integer(), primary_key=True)
        user_id = db.Column(db.Integer(),  db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
        battle = db.Column(db.Integer())
        wins = db.Column(db.Integer())
        loss = db.Column(db.Integer())
    else:
        id = db.Column(db.Integer(), primary_key=True)
        user_id = db.Column(db.Integer(),  db.ForeignKey("users.id"),nullable=False)
        battle = db.Column(db.Integer())
        wins = db.Column(db.Integer())
        loss = db.Column(db.Integer())

    users = db.relationship("User", back_populates="user_info")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'battles': self.battle,
            'wins': self.wins,
            'losses': self.loss
        }
