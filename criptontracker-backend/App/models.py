from App import db, bcrypt 


class Usuario(db.Model):
    __tablename__ = 'usuarios'  # Cambiado a 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    

    # Relación con Favoritos
    favoritos = db.relationship('Favorito', back_populates='usuario')  # Cambiado a 'usuario'

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
            # La contraseña no se serializa por razones de seguridad
        }

class Favorito(db.Model):
    __tablename__ = 'favoritos'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)  # Cambiado a 'usuarios.id'
    simbolo_moneda = db.Column(db.String(10), nullable=False)  # Guardar solo el símbolo de la moneda

    usuario = db.relationship('Usuario', back_populates='favoritos')  # Cambiado a 'Usuario'

    def serialize(self):
        return {
            "id": self.id,
            "simbolo_moneda": self.simbolo_moneda
        }
class TokenBlockedList(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    jti=db.Column(db.String(100),nullable=False)