from app.models import db, Run, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_run():
    run1 = Run(
        user_id=1,
        char_1='{"char_id":1, "inv_id":1,"gear_id":1,"curhp":9, "stats":{"name":"Jon","hp":10,"patk":1,"matk":1,"pdef":1,"mdef":1}}',
        char_2='{"char_id":2, "inv_id":2,"gear_id":2,"curhp":1, "stats":{"name":"Zander","hp":10,"patk":1,"matk":1,"pdef":1,"mdef":1}}',
        char_3='{"char_id":3, "inv_id":3,"gear_id":3,"curhp":5, "stats":{"name":"Momo","hp":10,"patk":1,"matk":1,"pdef":1,"mdef":1}}',
        seed='test Seed info 1')
    run2 = Run(
        user_id=1,
        char_1='{"char_id":1,"inv_id":1,"gear_id":1,"curhp":3, "stats":{"name":"Jon","hp":10,"patk":1,"matk":1,"pdef":1,"mdef":1}}',
        char_2='{"char_id":3,"inv_id":3,"gear_id":3,"curhp":0, "stats":{"name":"Momo","hp":10,"patk":1,"matk":1,"pdef":1,"mdef":1}}',
        char_3='',
        seed='test Seed info 1')
    run3 = Run(
        user_id=1,
        char_1='{"char_id":1,"inv_id":1,"gear_id":1,"curhp":4, "stats":{"name":"Jon","hp":10,"patk":1,"matk":1,"pdef":1,"mdef":1}}',
        char_2='{"char_id":2,"inv_id":2,"gear_id":2,"curhp":5, "stats":{"name":"Zander","hp":10,"patk":1,"matk":1,"pdef":1,"mdef":1}}',
        char_3='',
        seed='test Seed info 1')
    run4 = Run(
        user_id=1,
        char_1='{"char_id":3,"inv_id":3,"gear_id":3,"curhp":10, "stats":{"name":"Momo","hp":10,"patk":1,"matk":1,"pdef":1,"mdef":1}}',
        char_2='',
        char_3='',
        seed='test Seed info 1')
    db.session.add(run1)
    db.session.add(run2)
    db.session.add(run3)
    db.session.add(run4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_run():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.runs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM runs"))

    db.session.commit()
