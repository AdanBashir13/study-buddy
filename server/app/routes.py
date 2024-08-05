from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User, StudySchedule, Progress, StudyGroup, GroupMember
from app.extensions import db


api = Blueprint("api", __name__)


@api.route('/')
def index():
    return f'<h1>Welcome to the studdy buddy api</h1>'

@api.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = generate_password_hash(data.get("password"))

    user = User(username=username, email=email, password_hash=password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200

    return jsonify({"message": "Invalid credentials"}), 401


@api.route("/study-schedules", methods=["GET"])
@jwt_required()
def get_study_schedules():
    user_id = get_jwt_identity()
    schedules = StudySchedule.query.filter_by(user_id=user_id).all()
    return jsonify([schedule.to_dict() for schedule in schedules]), 200


@api.route("/study-schedules", methods=["POST"])
@jwt_required()
def create_study_schedule():
    user_id = get_jwt_identity()
    data = request.get_json()
    title = data.get("title")
    description = data.get("description")

    schedule = StudySchedule(title=title, description=description, user_id=user_id)
    db.session.add(schedule)
    db.session.commit()

    return jsonify(schedule.to_dict()), 201


@api.route("/study-schedules/<int:schedule_id>", methods=["GET"])
@jwt_required()
def get_study_schedule(schedule_id):
    user_id = get_jwt_identity()
    schedule = StudySchedule.query.filter_by(id=schedule_id, user_id=user_id).first()

    if not schedule:
        return jsonify({"message": "Study schedule not found"}), 404

    return jsonify(schedule.to_dict()), 200


@api.route("/study-schedules/<int:schedule_id>", methods=["PUT"])
@jwt_required()
def update_study_schedule(schedule_id):
    user_id = get_jwt_identity()
    schedule = StudySchedule.query.filter_by(id=schedule_id, user_id=user_id).first()

    if not schedule:
        return jsonify({"message": "Study schedule not found"}), 404

    data = request.get_json()
    schedule.title = data.get("title")
    schedule.description = data.get("description")
    db.session.commit()

    return jsonify(schedule.to_dict()), 200


@api.route("/study-schedules/<int:schedule_id>", methods=["DELETE"])
@jwt_required()
def delete_study_schedule(schedule_id):
    user_id = get_jwt_identity()
    schedule = StudySchedule.query.filter_by(id=schedule_id, user_id=user_id).first()

    if not schedule:
        return jsonify({"message": "Study schedule not found"}), 404

    db.session.delete(schedule)
    db.session.commit()

    return jsonify({"message": "Study schedule deleted"}), 200


@api.route("/study-schedules/<int:schedule_id>/progress", methods=["POST"])
@jwt_required()
def create_progress(schedule_id):
    user_id = get_jwt_identity()
    schedule = StudySchedule.query.filter_by(id=schedule_id, user_id=user_id).first()

    if not schedule:
        return jsonify({"message": "Study schedule not found"}), 404

    data = request.get_json()
    date = data.get("date")
    status = data.get("status")

    progress = Progress(study_schedule_id=schedule_id, date=date, status=status)
    db.session.add(progress)
    db.session.commit()

    return jsonify(progress.to_dict()), 201


def register_routes(app):
    app.register_blueprint(api, url_prefix="/api")
