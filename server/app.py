from flask import Flask
from flask_cors import CORS
from flask_restful import Api

# Import Resources


app = Flask(__name__)

# Cors
CORS(app)

# Api
api = Api(app, '/api')