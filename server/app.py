from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from flask_bcrypt import Bcrypt
from models import db, User, StudySchedule, Progress, StudyGroup, group_member
from datetime import datetime
from init import create_app
from sqlalchemy import select
import logging

app = create_app()

# Setup logging for debugging
logging.basicConfig(level=logging.DEBUG)

# Setup the Flask-JWT-Extended extension
app.config['JWT_SECRET_KEY'] = '123456789'  
jwt = JWTManager(app)

# Setup Bcrypt for password hashing
bcrypt = Bcrypt(app)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/api/register', methods=['POST'])
def register_user():
    # Register a new user
    data = request.get_json()
    existing_user = User.query.filter((User.username == data['username']) | (User.email == data['email'])).first()
    if existing_user:
        return jsonify({"message": "Username or email already exists"}), 400
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], email=data['email'], password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

@app.route('/api/login', methods=['POST'])
def login_user():
    # Log in a user and return an access token
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'token': access_token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/study-schedules', methods=['GET'])
@jwt_required()
def get_study_schedules():
    # Get study schedules for the logged-in user
    user_id = get_jwt_identity()
    schedules = StudySchedule.query.filter_by(user_id=user_id).all()
    return jsonify({'study_schedules': [schedule.serialize() for schedule in schedules]}), 200

@app.route('/api/study-schedules', methods=['POST'])
@jwt_required()
def create_study_schedule():
    # Create a new study schedule
    data = request.json
    title = data.get('title')
    user_id = get_jwt_identity()
    date_str = data.get('date')
    time_str = data.get('time')

    date_object = datetime.strptime(date_str, '%Y-%m-%d').date()
    time_object = datetime.strptime(time_str, '%H:%M').time()

    new_schedule = StudySchedule(title=title, user_id=user_id, date=date_object, time=time_object)
    db.session.add(new_schedule)
    db.session.commit()

    new_progress = Progress(study_schedule_id=new_schedule.id, status='uncompleted')
    db.session.add(new_progress)
    db.session.commit()

    return jsonify({"message": "Study schedule created successfully"}), 201

@app.route('/api/progress', methods=['GET'])
@jwt_required()
def get_progress():
    # Get progress records for all study sessions
    progress_records = Progress.query.all()
    result = []
    for record in progress_records:
        schedule = StudySchedule.query.get(record.study_schedule_id)
        if schedule:
            result.append({
                'id': record.id,
                'study_schedule_id': record.study_schedule_id,
                'title': schedule.title,
                'date': schedule.date.isoformat(),
                'time': schedule.time.strftime('%H:%M'),
                'status': record.status
            })
    return jsonify({'progress': result}), 200

@app.route('/api/progress', methods=['POST'])
@jwt_required()
def create_progress():
    # Create a new progress record for a study session
    data = request.get_json()
    new_progress = Progress(study_schedule_id=data['study_schedule_id'], status=data['status'])
    db.session.add(new_progress)
    db.session.commit()
    return jsonify(new_progress.serialize()), 201

@app.route('/api/progress/<int:progress_id>', methods=['PUT'])
@jwt_required()
def mark_session_completed(progress_id):
    # Mark a study session as completed
    progress_record = Progress.query.get_or_404(progress_id)
    progress_record.status = 'completed'
    db.session.commit()
    return jsonify({'message': 'Session marked as completed!'}), 200

@app.route('/api/study-groups', methods=['GET'])
@jwt_required()
def get_study_groups():
    # Get all study groups
    groups = StudyGroup.query.all()
    return jsonify({'study_groups': [group.serialize() for group in groups]}), 200

@app.route('/api/study-groups', methods=['POST'])
@jwt_required()
def create_study_group():
    # Create a new study group
    data = request.get_json()
    new_group = StudyGroup(name=data['name'], description=data.get('description'))
    db.session.add(new_group)
    db.session.commit()
    return jsonify(new_group.serialize()), 201

@app.route('/api/study-groups/<int:group_id>/join', methods=['POST'])
@jwt_required()
def join_study_group(group_id):
    # Join a study group
    user_id = get_jwt_identity()

    existing_member_query = select(group_member).where(
        (group_member.c.study_group_id == group_id) &
        (group_member.c.user_id == user_id)
    )
    existing_member = db.session.execute(existing_member_query).first()

    if existing_member:
        return jsonify({'message': 'You are already a member of this group.'}), 400

    new_member = group_member.insert().values(study_group_id=group_id, user_id=user_id)

    try:
        db.session.execute(new_member)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Error adding member: {str(e)}")
        return jsonify({'message': 'Failed to join group.'}), 500

    return jsonify({'message': 'You have joined the group successfully!'}), 201

@app.route('/api/study-groups/<int:group_id>', methods=['GET'])
@jwt_required()
def get_study_group(group_id):
    # Get details of a specific study group
    group = StudyGroup.query.get_or_404(group_id)
    return jsonify(group.serialize()), 200

@app.route('/api/study-groups/<int:group_id>', methods=['PUT'])
@jwt_required()
def update_study_group(group_id):
    # Update a study group's details
    group = StudyGroup.query.get_or_404(group_id)
    data = request.get_json()
    group.name = data.get('name', group.name)
    group.description = data.get('description', group.description)
    db.session.commit()
    return jsonify(group.serialize()), 200

@app.route('/api/study-groups/<int:group_id>', methods=['DELETE'])
@jwt_required()
def delete_study_group(group_id):
    # Delete a study group
    group = StudyGroup.query.get_or_404(group_id)
    db.session.delete(group)
    db.session.commit()
    return jsonify({"message": "Study group deleted successfully"}), 200

@app.route('/api/joined-groups', methods=['GET'])
@jwt_required()
def get_joined_groups():
    # Get all study groups the user has joined
    user_id = get_jwt_identity()
    joined_groups = StudyGroup.query.join(group_member).filter(group_member.c.user_id == user_id).all()
    return jsonify({'joined_groups': [group.serialize() for group in joined_groups]}), 200

@app.route('/api/setup', methods=['POST'])
def setup_data():
    # Set up initial data for testing
    user1 = User(username='user1', email='user1@example.com', password_hash='hashed_password')
    user2 = User(username='user2', email='user2@example.com', password_hash='hashed_password')

    study_group = StudyGroup(name='Study Group 1', description='A group for studying together')

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(study_group)
    db.session.commit()

    return jsonify({'message': 'Setup completed!'}), 201

if __name__ == '__main__':
    app.run(port=5555, debug=True)
