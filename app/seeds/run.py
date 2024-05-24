from app.models import db, Run, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_run():
    run1 = Run(
        user_id=1, use_item_id=1,char_id=1,seed='test Seed info 1')
    run2 = Run(
        user_id=2, use_item_id=2,char_id=2,seed='test Seed info 2')
    run3 = Run(
        user_id=3, use_item_id=3,char_id=3,seed='test Seed info 3')

    db.session.add(run1)
    db.session.add(run2)
    db.session.add(run3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_run():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.run RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM run"))

    db.session.commit()
