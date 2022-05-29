import jwt
from flask import jsonify,request,current_app
import hashlib
from models.conn import MongoDB
from functools import wraps

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None        
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')
        if not token:
            return jsonify({'message' : 'Auth token is missing !!'}), 401
  
        try:
          
            data = jwt.decode(token[1], current_app.config['JWT_SECRET_KEY'])
            db = MongoDB()
            current_user =  db.get_data(
            'users', {'username': data['payload']})
            if not current_user['_id']:
                return jsonify({
                     'message' : 'Token is invalid !!'
                }), 401
        except Exception as e:
            print(e)
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users contex to the routes
        return  f(*args, **kwargs)
  
    return decorated

def login(username, password):
    try:
        enc_password = hashlib.sha256(password.encode("utf-8")).hexdigest()
      
        db = MongoDB()
        user = db.get_data(
            'users', {'username': username, 'password': enc_password})
        if(user and user['username']):
            access_token = jwt.encode({'payload':username},current_app.config['JWT_SECRET_KEY'],algorithm='HS256').decode('utf-8')
            return jsonify({'access_token':access_token,'status':'success'}), 200
        else:
            return jsonify({'status': 'error', 'message': 'Invalid Username/Password'}), 401
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'something went wrong'}), 500


def registeration(username, password):
    db = MongoDB()
    user = db.get_data(
        'users', {'username': username})
    if user and len(user) > 0:
        return jsonify({'status': 'error', 'message': 'Username already Exists'}), 500
    else:
        userdata = {}
        userdata["username"] = username
        userdata["password"] = hashlib.sha256(
            password.encode("utf-8")).hexdigest()
        db.insert_data('users', userdata)
        return jsonify({'status': 'success', 'message': 'User Created successfully'}), 201

