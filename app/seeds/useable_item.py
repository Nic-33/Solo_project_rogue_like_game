from app.models import db, Useable_item, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_useable_item():
    useable_item1 = Useable_item(
        user_id=1, useable_inv='{"potion":3, "repel":2}')
    useable_item2 = Useable_item(
        user_id=2, useable_inv='{"Potion":4}')
    useable_item3 = Useable_item(
        user_id=3, useable_inv='{}')

    db.session.add(useable_item1)
    db.session.add(useable_item2)
    db.session.add(useable_item3)
    db.session.commit()


# Uses a raw SQL query to TUSEABLE_ITEMCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_useable_item():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.useable_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM useable_items"))

    db.session.commit()
