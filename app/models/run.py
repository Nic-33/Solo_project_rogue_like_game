from .db import db, environment, SCHEMA, add_prefix_for_prod

class Run (db.Model):
    __tablename__ = 'runs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(),  db.ForeignKey("users.id"),nullable=False)
    char_1 = db.Column(db.String,nullable=False)
    char_2 = db.Column(db.String())
    char_3 = db.Column(db.String())
    seed = db.Column(db.String(), nullable=False)

    users = db.relationship("User", back_populates="runs")



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'character_1': self.char_1,
            'character_2': self.char_2,
            'character_3': self.char_3,
            'seed': self.seed
        }
