from datetime import datetime
from app.extensions import db
from flask_bcrypt import generate_password_hash, check_password_hash


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    study_schedules = db.relationship("StudySchedule", backref="user", lazy=True)
    group_memberships = db.relationship("GroupMember", backref="user", lazy=True)

    # @password_hash.setter
    # def password(self, password):
    #     self.password_hash = generate_password_hash(password).decode("utf-8")

    # def check_password(self, password):
    #     return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at,
        }

    def __repr__(self):
        return f"<User {self.username}>"


class StudySchedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    progress_records = db.relationship("Progress", backref="study_schedule", lazy=True)

    def __repr__(self):
        return f"<StudySchedule {self.title}>"

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "created_at": self.created_at,
        }


class Progress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    study_schedule_id = db.Column(
        db.Integer, db.ForeignKey("study_schedule.id"), nullable=False
    )
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"<Progress {self.status}>"

    def to_dict(self):
        return {
            "id": self.id,
            "study_schedule_id": self.study_schedule_id,
            "date": self.date,
            "status": self.status,
        }


class StudyGroup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500), nullable=True)

    members = db.relationship("GroupMember", backref="study_group", lazy=True)

    def __repr__(self):
        return f"<StudyGroup {self.name}>"


class GroupMember(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    study_group_id = db.Column(
        db.Integer, db.ForeignKey("study_group.id"), nullable=False
    )
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __repr__(self):
        return f"<GroupMember {self.id}>"
