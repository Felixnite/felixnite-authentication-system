"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_jwt_extended import JWTManager
import os
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# salt
def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

# hash
def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")

# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }


@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.json
    password = body.get('password')
    # Verificar si el correo electronico ya existe
    exist_user = User.query.filter_by(email = body['email']).first()
    if exist_user: 
        return jsonify({'error': 'email already exists'}), 400
    
    salt = b64encode(os.urandom(32)).decode("utf-8")
   
        
    new_user = User(
        email = body['email'],
        username = body['username'],
        password = set_password(password, salt),
        salt = salt
      
    )

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'User created succesfully'}), 200

    

@api.route('/login', methods=['POST'])
def handle_login():
    body = request.json
    email = body.get("email")
    password = body.get("password")

    if email is None or password is None:
        return jsonify({"message":"You need email and password"}), 400
    else: 
        user = User.query.filter_by(email = email).first()
        if user is None:
            return jsonify({"message":"bad credentials"}), 400 
        
        if check_password(user.password, password, user.salt):
            access_token = create_access_token(identity = email) 
            return jsonify({"token":access_token, "user": user.serialize()}), 200
        
        else: 
            return jsonify({"message":"bad credentials"}), 400
        
@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify(list(map(lambda user: user.serialize(), users))), 200

@api.route('/profile', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email = current_user).first()
    if user is None: 
        return jsonify({"message":"bad credentials"}), 401
    return jsonify(user.serialize()), 200

