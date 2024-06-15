"""empty message

Revision ID: 976b33bd17aa
Revises:
Create Date: 2024-06-02 23:45:53.895022

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '976b33bd17aa'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('gear',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('head', sa.Integer(), nullable=False),
    sa.Column('chest', sa.Integer(), nullable=False),
    sa.Column('left', sa.Integer(), nullable=False),
    sa.Column('right', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('inventory',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('inv', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('character_info',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('inv_id', sa.Integer(), nullable=False),
    sa.Column('gear_id', sa.Integer(), nullable=False),
    sa.Column('stats', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['gear_id'], ['gear.id'], ),
    sa.ForeignKeyConstraint(['inv_id'], ['inventory.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('runs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('char_1', sa.String(), nullable=False),
    sa.Column('char_2', sa.String(), nullable=True),
    sa.Column('char_3', sa.String(), nullable=True),
    sa.Column('seed', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('useable_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('useable_inv', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_info',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('battle', sa.Integer(), nullable=True),
    sa.Column('wins', sa.Integer(), nullable=True),
    sa.Column('loss', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_info')
    op.drop_table('useable_items')
    op.drop_table('runs')
    op.drop_table('character_info')
    op.drop_table('users')
    op.drop_table('inventory')
    op.drop_table('gear')
    # ### end Alembic commands ###
