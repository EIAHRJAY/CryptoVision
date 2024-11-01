from flask import Blueprint, jsonify, request
from flask import Flask
from flask_cors import CORS
import requests
from App import db
from App.models import Usuario, TokenBlockedList, Favorito
from flask_jwt_extended import create_access_token, jwt_required, get_jwt,decode_token, get_jwt_identity
import mailtrap as mt
from datetime import datetime, timedelta
import jwt
import os
from openai import OpenAI


# @main.route('/favorite', methods=['POST'])
# @jwt_required()
# def add_favorite():
#     try:
#         simbolo_moneda = request.json.get('simbolo_moneda')  # Cambié 'simbolo_monedas' a 'simbolo_moneda'
#         usuario_id = get_jwt_identity()

#         if not simbolo_moneda:
#             return jsonify({"error": "El símbolo de la moneda es requerido"}), 400

#         new_favorites = Favorito(usuario_id=usuario_id, simbolo_moneda=simbolo_moneda)
#         db.session.add(new_favorites)
#         db.session.commit()

#         return jsonify({"message": "Favorite added successfully"}), 201

#     except Exception as e:
#         db.session.rollback()  # En caso de error, deshacer cambios
#         return jsonify({"error": str(e)}), 500  # Respuesta con el mensaje de error

# @main.route('/favorites', methods=['GET'])
# @jwt_required()
# def get_favorites():
#     try:
#         usuario_id = get_jwt_identity()
#         favorites = Favorito.query.filter_by(usuario_id=usuario_id).all()

#         if not favorites:
#             return jsonify({"message": "No favorites found"}), 404

#         return jsonify([favorito.serialize() for favorito in favorites]), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


main = Blueprint('main', __name__)

COINCAP_KEY = os.getenv('COINCAP_KEY')

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


@main.route('/favorite', methods=['POST'])
@jwt_required()
def add_favorite():
    try:
        usuario_id = get_jwt_identity()
        data = request.get_json()
        simbolo_moneda = data.get('simbolo_moneda')

        # Check if it's already a favorite
        existing_favorite = Favorito.query.filter_by(usuario_id=usuario_id, simbolo_moneda=simbolo_moneda).first()
        if existing_favorite:
            return jsonify({"message": "This crypto is already in your favorites"}), 400

        # Add favorite currency
        new_favorite = Favorito(usuario_id=usuario_id, simbolo_moneda=simbolo_moneda)
        db.session.add(new_favorite)
        db.session.commit()

        return jsonify({"message": "Favorite added"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@main.route('/favorite/<string:crypto_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(crypto_id):
    try:
        # Busca el favorito utilizando el `usuario_id` y el `simbolo_moneda` en lugar de `id`
        usuario_id = get_jwt_identity()
        favorite = Favorito.query.filter_by(simbolo_moneda=crypto_id, usuario_id=usuario_id).first()

        if not favorite:
            return jsonify({"message": "Favorite not found"}), 404

        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"message": "Favorite successfully removed"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@main.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    try:
        usuario_id = get_jwt_identity()

        # Obtener los símbolos de las monedas favoritas del usuario
        favorites = Favorito.query.filter_by(usuario_id=usuario_id).all()
        favorite_symbols = [favorito.simbolo_moneda for favorito in favorites]

        if not favorite_symbols:
            return jsonify({"message": "No favorites found"}), 404

        # Llamar a la API de CoinCap para obtener los detalles de las monedas favoritas
        response = requests.get(
            "https://api.coincap.io/v2/assets",
            params={"ids": ','.join(favorite_symbols)}
        )

        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch data from CoinCap API"}), 500

        favorites_data = response.json().get('data')
        return jsonify(favorites_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


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
        print(f"Error retrieving users:{str(e)}")

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


@main.route('/signup', methods=['POST'])
def signup():
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

    frontend_url = os.getenv("REACT_APP_FRONTEND_URL")
    # Genera el enlace de restablecimiento de contraseña
    #reset_link = url_for('api.reset_password', _external=True) + f"?token={reset_token}"
    reset_link = f"{frontend_url}/ResetPassword?token={reset_token}"

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
    client = mt.MailtrapClient(token="88db215e7f81c5d35dc370d7b77a4bbd")

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


@main.route('/cryptos', methods=['GET'])
@jwt_required()
def get_cryptos():
    try:
        headers = {
            'Authorization': f'Bearer {COINCAP_KEY}',
            'Accept-Encoding': 'gzip, deflate'  # Recomendado para la compresión
        }

        response = requests.get("https://api.coincap.io/v2/assets", headers=headers)

        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch data from CoinCap API"}), 500
        
        cryptos = response.json().get('data')
        return jsonify(cryptos), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@main.route('/cryptos/<string:crypto_id>', methods=['GET'])
@jwt_required()
def get_crypto_details(crypto_id):
    try:
        headers = {
            'Authorization': f'Bearer {COINCAP_KEY}',  # Usa tu API Key
            'Accept-Encoding': 'gzip, deflate'
        }

        # Consulta la API para obtener los detalles de una criptomoneda específica
        response = requests.get(f"https://api.coincap.io/v2/assets/{crypto_id}", headers=headers)

        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch data from CoinCap API"}), 500

        # Detalles de la criptomoneda en formato JSON
        crypto_details = response.json().get('data')
        return jsonify(crypto_details), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
