from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS

bcrypt = Bcrypt()
db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    # Configuración de la base de datos
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'tu_clave_secreta'  # Cambia esto a una clave segura

    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)

    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    from App.models import Usuario, Favorito

    # with app.app_context():
    #  db.create_all()


    # Importar y registrar rutas
    from App.routes import main
    app.register_blueprint(main)

    return app