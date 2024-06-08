from app.models import db, Character_info, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_character_info():
    character_info1 = Character_info(
        user_id=1, inv_id=1, gear_id=1, stats='{"name":"Jon","hp":100,"patk":10,"matk":10,"pdef":10,"mdef":10, "agl":10}')
    character_info2 = Character_info(
        user_id=1, inv_id=2, gear_id=2, stats='{"name":"Zander","hp":100,"patk":10,"matk":10,"pdef":10,"mdef":10, "agl":10}')
    character_info3 = Character_info(
        user_id=1, inv_id=3, gear_id=3, stats='{"name":"Momo","hp":100,"patk":10,"matk":10,"pdef":10,"mdef":10,"agl":10}')

    db.session.add(character_info1)
    db.session.add(character_info2)
    db.session.add(character_info3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_character_info():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.character_info RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM character_info"))

    db.session.commit()
