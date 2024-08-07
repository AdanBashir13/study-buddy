from init import db
from datetime import datetime, timezone
from sqlalchemy import Table, Column, Integer, ForeignKey

# Define the association table for the many-to-many relationship between users and study groups
group_member = Table('group_member', db.metadata,
    Column('study_group_id', Integer, ForeignKey('study_groups.id'), primary_key=True),
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def serialize(self):
        # Serialize user data for JSON response
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

class StudySchedule(db.Model):
    __tablename__ = 'study_schedules'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    date = db.Column(db.Date)
    time = db.Column(db.Time)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    progress_records = db.relationship('Progress', backref='study_schedule', lazy=True)

    def serialize(self):
        # Serialize study schedule data for JSON response
        return {
            'id': self.id,
            'title': self.title,
            'date': self.date.strftime('%Y-%m-%d') if self.date else None,
            'time': self.time.strftime('%H:%M:%S') if self.time else None,
            'user_id': self.user_id
        }

class Progress(db.Model):
    __tablename__ = 'progress'

    id = db.Column(db.Integer, primary_key=True)
    study_schedule_id = db.Column(db.Integer, db.ForeignKey('study_schedules.id'))
    status = db.Column(db.String(50), default='uncompleted')  # Status can be 'uncompleted' or 'completed'
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    def serialize(self):
        # Serialize progress data for JSON response
        return {
            'id': self.id,
            'study_schedule_id': self.study_schedule_id,
            'status': self.status,
            'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S')
        }

class StudyGroup(db.Model):
    __tablename__ = 'study_groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(255))

    # Define the many-to-many relationship with User
    members = db.relationship('User', secondary=group_member, backref=db.backref('groups', lazy='dynamic'))

    def serialize(self):
        # Serialize study group data for JSON response
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }
