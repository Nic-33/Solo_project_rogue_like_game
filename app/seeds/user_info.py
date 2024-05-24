from app.models import db, User_info, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_user_info():
    user_info1 = User_info(
        user_id=1, battle=20, wins=15, loss=5)
    user_info2 = User_info(
        user_id=2, battle=40, wins=30, loss=10)
    user_info3 = User_info(
        user_id=3, battle=4, wins=4, loss=0)

    db.session.add(user_info1)
    db.session.add(user_info2)
    db.session.add(user_info3)
    db.session.commit()


# Uses a raw SQL query to TUSER_INFOCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_user_info():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_info RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_info"))

    db.session.commit()
