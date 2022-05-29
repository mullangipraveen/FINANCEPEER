
from flask import Flask, jsonify, render_template, request, json
from controllers.auth import login,registeration,token_required
from werkzeug.utils import secure_filename
from controllers.data import save_data,get_all_data
from flask_jwt_extended import JWTManager,jwt_required
from flask_cors import CORS, cross_origin
import datetime

app = Flask(__name__)
cors = CORS(app)
app.config['JWT_SECRET_KEY'] = 'SecreatToken'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)





@app.route('/')
def home():
    return 'Home'


"""
Login route
@required params username and password
"""


@app.route('/api/v1/login', methods=['POST'])
def loginHome():
    login_details = request.get_json()
    if login_details and login_details['username'] and login_details['password']:
        return login(login_details['username'], login_details['password'])
    else:
        return jsonify({'status': 'error', 'message': 'username and password required'}),401



"""
Registation route
@required : username and Password
"""
@app.route("/api/v1/register", methods=["post"])
def register():
    new_user = request.get_json()
    if new_user['username'] and new_user['password']:
        return registeration(new_user['username'], new_user['password'])
    else:
        return jsonify({'status': 'error', 'message': 'username and password required to register'}),500
"""
File Upload
"""
@app.route('/api/v1/upload', methods=['POST'])
@token_required
def upload_file():
    file = request.files['file']
    if file:
        file.seek(0)
        filedata = json.loads(file.read())
        for x in filedata:
            save_data('userdata', x)
        return jsonify({'status': 'success', 'message': 'File uploaded succesfully'}),200
    else:
        return jsonify({'status': 'error', 'message': 'Invalid file'}),500


"""
get all user Data
"""
@app.route('/api/v1/getdata', methods=['GET'])
@token_required
def getdata():
    return jsonify(get_all_data('userdata'))

"""
verify jwt
"""
@app.route('/api/v1/validate_token', methods=['GET'])
@token_required
def validate_token():
    return jsonify({'status':'success'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=1)



    
