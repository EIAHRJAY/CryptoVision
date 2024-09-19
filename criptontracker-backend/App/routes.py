from flask import Blueprint, jsonify, request
from App import db
from App.models import User
from flask_jwt_extended import create_access_token, jwt_required

main = Blueprint('main', __name__)

# Ruta de inicio
@main.route('/')
def home():
    return '¡El servidor está funcionando correctamente!'

# Ruta de estado
@main.route('/status')
def status():
    return jsonify({'status': 'ok', 'message': 'Backend funcionando correctamente'})

# Ruta para registrar un usuario
@main.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']  # Asegúrate de hash esta contraseña en producción

    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'Usuario registrado exitosamente'}), 201

# Ruta para iniciar sesión
@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username'], password=data['password']).first()
    
    if user:
        access_token = create_access_token(identity=user.username)
        return jsonify(access_token=access_token), 200
    return jsonify({'msg': 'Usuario o contraseña incorrectos'}), 401

# Ruta protegida
@main.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({'msg': 'Este es un recurso protegido'})
