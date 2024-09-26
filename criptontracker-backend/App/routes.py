from flask import Blueprint, jsonify, request
import requests
from App import db
from App.models import Usuario, TokenBlockedList
from flask_jwt_extended import create_access_token, jwt_required, get_jwt, get_jwt,decode_token
import mailtrap as mt
from datetime import datetime, timedelta
import jwt
import os
from openai import OpenAI

main = Blueprint('main', __name__)

# Ruta de inicio
@main.route('/')
def home():
    return '¡El servidor está funcionando correctamente!'

# Ruta de estado
@main.route('/status')
def status():
    return jsonify({'status': 'ok', 'message': 'Backend funcionando correctamente'})

@main.route('/test-db')
def test_db():
    try:
        # Hacer una consulta sencilla a una tabla, por ejemplo, User
        users = Usuario.query.all()
        return f"Conexión exitosa: {len(users)} usuarios encontrados"
    except Exception as e:
        return f"Error en la conexión a la base de datos: {e}"

@main.route('/users', methods=['GET'])
def users():
    try:
        users = Usuario.query.all()
        if not users:
            return jsonify({"message": "No users found"}), 404
        
        return jsonify({
            "message": "User retrieved successfully",
            "data":[user.serialize() for user in users]
        })
    except Exception as e:
        print(f"Error retrienving users:{str(e)}")

        return jsonify({
            "message": " An error occurred while retrieving users",
            "error": str(e) 
        }), 500

@main.route('/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete(id):
    try:
        user= Usuario.query.get(id)

        if user is None:
            return jsonify({"message": "User not found"}), 404
        
        db.session.delete(user)
        db.session.commit()

        return jsonify({"message": "User delete successfully"}),200
    
    except Exception as e: 
        return jsonify({
            "message": "An error occurred while deleting the user",
            "error": str(e)
        }), 500


@main.route('/user/<int:id>', methods=['PATCH'])
@jwt_required()
def change(id):
    user =Usuario.query.filter_by(id=id).first()

    if user is None:
        return jsonify({
            "info": "Not found"
        }), 404
    
    changes_body = request.get_json()

    if "name" in changes_body:
        user.name=changes_body["name"]

    if "email" in changes_body:
        user.email=changes_body["email"]

    #db.session.add(user)
    db.session.commit()
    
    return jsonify(user.serialize()), 200


@main.route('/singup', methods=['POST'])
def singup():
    try:
        data = request.get_json()
        name = data['name']
        email = data['email']
        password = data['password']

        # Comprobar si el usuario ya existe
        if Usuario.query.filter_by(email=email).first():
            return jsonify({'msg': 'The email is already registered'}), 400

        new_user = Usuario(name=name, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({'msg': 'User created successfully'}), 201
    except Exception as e:
        db.session.rollback()  # Deshacer cambios si hay un error
        return jsonify({'msg': 'Error creating user', 'error': str(e)}), 500

@main.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        user = Usuario.query.filter_by(email=data['email']).first()

        if user and user.check_password(data['password']):
            access_token = create_access_token(identity=user.name)
            return jsonify(access_token=access_token), 200
        return jsonify({'msg': 'Incorrect username or password'}), 401
    except Exception as e:
        return jsonify({'msg': 'Error in login process', 'error': str(e)}), 500

@main.route('/logout', methods=['POST'])
@jwt_required()
def user_logout():
    try:
        jti=get_jwt()["jti"]
        token_blocked=TokenBlockedList(jti=jti)
        db.session.add(token_blocked) 
        db.session.commit()
        
        return jsonify({"msg":"Session closed"}), 200
    
    except Exception as e:
        return jsonify({
            "message": "An error occurred while logging out",
            "error": str(e)
        }), 500

@main.route('/generate_reset_token', methods=['POST'])
def generate_reset_token():
    email = request.json.get('email')
    
    user = Usuario.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Email not found"}), 404

    # Genera un token JWT con un tiempo de expiración
    reset_token = create_access_token(identity=user.id , expires_delta=timedelta(minutes=30))

    frontend_url = os.getenv("FRONTURL")
    # Genera el enlace de restablecimiento de contraseña
    #reset_link = url_for('api.reset_password', _external=True) + f"?token={reset_token}"
    reset_link = f"{frontend_url}/resetpass?token={reset_token}"

    # Configura los detalles del correo
    mail = mt.Mail(
        sender=mt.Address(email="mailtrap@demomailtrap.com", name="Cripto Vision"),
        to=[mt.Address(email=user.email)],
        subject="Password Reset Request",
        text=f"""
        Hola,

        Gracias por contactarte con el equipo de Cripto Vision.

        Hemos recibido una solicitud para restablecer tu contraseña. Para completar este proceso, por favor, Haz clic a el enlace a continuación: {reset_link}

        Nota: Este enlace es válido por 5 minutos. Si no completas el proceso dentro de este plazo, el enlace caducará y deberás solicitar un nuevo enlace de restablecimiento.

        Si necesitas ayuda adicional, no dudes en ponerte en contacto con nuestro equipo de soporte.

        Saludos cordiales,
          
            Equipo  Cripto Vision.
        """,
        category="Password Reset",
    )

    # Inicializa el cliente con tu token de API de Mailtrap
    client = mt.MailtrapClient(token={os.getenv('MAILTRAP_KEY')})

    try:
        # Envía el correo
        client.send(mail)
        return jsonify({"message": "Reset token sent to your email"}), 200

    except Exception as e:
        return jsonify({"message": f"Failed to send email: {str(e)}"}), 500

# Ruta para restablecer la contraseña
@main.route('/reset_password', methods=['POST'])
def reset_password():
    reset_token = request.json.get('reset_token')
    new_password = request.json.get('new_password')
    
    try:
        # Decodifica el token JWT para obtener la identidad del usuario
        user_id = decode_token(reset_token)['sub']
        user = Usuario.query.get(user_id)

        if not user:
            return jsonify({"message": "Invalid token"}), 404

        # Aquí puedes implementar una función para hash la nueva contraseña, si no la tienes ya en el modelo.
        user.set_password(new_password)
        db.session.commit()

        return jsonify({"message": "Password reset successful"}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired"}), 400
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 400


# Llamada a la API de OpenAI
def openai_response(messages):
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {os.getenv('API_KEY')}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": messages,
        "temperature": 0.7
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": response.text}

# Validar contenido inapropiado
def prohibited(content):
    forbidden_words = ["porno", "roubo", "matar", "suicidio"]
    return any(keyword in content.lower() for keyword in forbidden_words)

# Ruta principal
@main.route('/chat', methods=['POST'])
def chat():
    if request.method == 'POST':
        data = request.get_json()
        content = data.get('content')

        # Finalizar conversación
        if content == 'exit':
            return jsonify({"message": "Conversation ended"}), 200

        # Mensaje inicial de sistema y usuario
        messages = [
            {"role": "system", "content": "Talk only about cryptocurrency-related topics, prices, market analysis, blockchain news, and also be brief with the answers."},
            {"role": "user", "content": content},
        ]

        try:
            # Llamada a la API de OpenAI
            response = openai_response(messages)

            if "error" in response:
                return jsonify({"error": response["error"]}), 500
            
            result = response['choices'][0]['message']['content']

            # Validar contenido inapropiado
            if prohibited(result):
                return jsonify({"message": "The content generated is inappropriate. Please refine your query."}), 400

            # Respuesta exitosa
            response_body = {"message": result}
            return jsonify(response_body), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"message": "Please send a POST request with content."}), 400