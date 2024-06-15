from flask.cli import AppGroup
from .users import seed_users, undo_users
from .gear import seed_gear, undo_gear
from .character_info import seed_character_info, undo_character_info
from .inventory import seed_inventory, undo_inventory
from .run import seed_run, undo_run
from .useable_item import seed_useable_item, undo_useable_item
from .user_info import seed_user_info, undo_user_info

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_gear()
        undo_character_info()
        undo_inventory()
        undo_run()
        undo_useable_item()
        undo_user_info()
    seed_users()
    seed_gear()
    seed_inventory()
    seed_character_info()
    seed_run()
    seed_useable_item()
    seed_user_info()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_gear()
    undo_character_info()
    undo_inventory()
    undo_run()
    undo_user_info()
    # Add other undo functions here
