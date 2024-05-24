from .db import db, environment, SCHEMA, add_prefix_for_prod

class Run (db.Model):
    __tablename__ = 'runs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(),  db.ForeignKey("users.id"),nullable=False)
    use_item_id = db.Column(db.Integer(), db.ForeignKey('useable_items.id'),nullable=False)
    char_id = db.Column(db.Integer(), db.ForeignKey('character_info.id'),nullable=False)
    seed = db.Column(db.Integer(), nullable=False)

    users = db.relationship("User", back_populates="runs")
    useable_items = db.relationship('Useable_item', back_populates="runs")
    char_info = db.relationship('Character_info', back_populates="runs")



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'use_item_id': self.use_item_id,
            'character_id': self.char_id,
            'seed': self.seed
        }
