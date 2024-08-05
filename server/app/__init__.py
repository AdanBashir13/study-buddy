from flask import Flask
from app.extensions import db, migrate, jwt
from flask_cors import CORS as cors
from app.config import Config
from app.routes import register_routes
import redis
from flask_caching import Cache


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config["CACHE_TYPE"] = "redis"
    app.config["CACHE_REDIS_HOST"] = "localhost"
    app.config["CACHE_REDIS_PORT"] = 6379
    app.config["CACHE_REDIS_DB"] = 0

    cache = Cache(app=app)
    cache.init_app(app)

    redis_client = redis.Redis(host="localhost", port=6379, db=0)
    cors(app)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    register_routes(app)

    return app
