from app.models import db, Gear, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_gear():
    gear1 = Gear(
        head=1, chest=2, left=3, right=4)
    gear2 = Gear(
        head=3, chest=2, left=1, right=1)
    gear3 = Gear(
        head=3, chest=2, left=4, right=1)

    db.session.add(gear1)
    db.session.add(gear2)
    db.session.add(gear3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_gear():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.gear RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM gear"))

    db.session.commit()
