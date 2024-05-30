from app.models import db, Inventory, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_inventory():
    inventory1 = Inventory(
        inv='{"head":[], "chest":[1,3], "right":[], "left":[]}')
    inventory2 = Inventory(
        inv='{"head":[2], "chest":[3,4], "right":[1,2], "left":[4]}')
    inventory3 = Inventory(
        inv='{"head":[], "chest":[], "right":[], "left":[]}')

    db.session.add(inventory1)
    db.session.add(inventory2)
    db.session.add(inventory3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_inventory():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.inventory RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM inventory"))

    db.session.commit()
