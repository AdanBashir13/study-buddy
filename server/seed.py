from app import create_app
from app.extensions import db
from app.models import User, StudySchedule, Progress, StudyGroup, GroupMember
from werkzeug.security import generate_password_hash
from datetime import datetime, date

app = create_app()


def populate_db():
    with app.app_context():
        db.drop_all()
        db.create_all()

        # Create Users
        user1 = User(
            username="john_doe",
            email="john@example.com",
            password_hash=generate_password_hash("password"),
        )
        user2 = User(
            username="jane_smith",
            email="jane@example.com",
            password_hash=generate_password_hash("password"),
        )

        db.session.add_all([user1, user2])
        db.session.commit()

        # Create StudySchedules
        schedule1 = StudySchedule(
            title="Math Study Plan",
            description="Math topics and exercises",
            user_id=user1.id,
            created_at=datetime.utcnow(),
        )
        schedule2 = StudySchedule(
            title="Science Study Plan",
            description="Science topics and experiments",
            user_id=user2.id,
            created_at=datetime.utcnow(),
        )

        db.session.add_all([schedule1, schedule2])
        db.session.commit()

        # Create Progress
        progress1 = Progress(
            study_schedule_id=schedule1.id, date=date.today(), status="Completed"
        )
        progress2 = Progress(
            study_schedule_id=schedule2.id, date=date.today(), status="Pending"
        )

        db.session.add_all([progress1, progress2])
        db.session.commit()

        # Create StudyGroups
        group1 = StudyGroup(
            name="Math Enthusiasts", description="A group for math lovers"
        )
        group2 = StudyGroup(
            name="Science Geeks", description="A group for science enthusiasts"
        )

        db.session.add_all([group1, group2])
        db.session.commit()

        # Create GroupMembers
        member1 = GroupMember(study_group_id=group1.id, user_id=user1.id)
        member2 = GroupMember(study_group_id=group2.id, user_id=user2.id)
        member3 = GroupMember(
            study_group_id=group1.id, user_id=user2.id
        )  # Adding Jane to Math Enthusiasts as well

        db.session.add_all([member1, member2, member3])
        db.session.commit()

        print("Database populated with sample data")


if __name__ == "__main__":
    populate_db()
