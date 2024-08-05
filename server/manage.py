from app import create_app
from app.extensions import db
from app.utils import init_db

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, load_dotenv=True)
