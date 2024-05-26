from .db import db, environment, SCHEMA, add_prefix_for_prod

class Character_info (db.Model):
    __tablename__ = 'character_info'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey("users.id"),nullable=False)
    inv_id = db.Column(db.Integer(), db.ForeignKey("inventory.id"), nullable=False)
    gear_id = db.Column(db.Integer(), db.ForeignKey('gear.id'), nullable=False)
    stats = db.Column(db.String(), nullable=False)

    users = db.relationship("User", back_populates="char_info")
    inventory = db.relationship("Inventory", back_populates="char_info")
    gear = db.relationship('Gear', back_populates='char_info')
    runs = db.relationship('Run', back_populates='char_info')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'inventory_id': self.inv_id,
            'gear_id': self.gear_id,
            'stats': self.stats
        }

    def get_gear_id(self):
        return {'user_id': self.user_id , 'gear_id':self.gear_id}

    def get_gear_inv_id(self):
        return {'inv':self.inv_id, 'gear_id':self.gear_id,'user_id': self.user_id}
