from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from dotenv import load_dotenv

# Import Resources
from resources.location import Location
from resources.transport import TransportInfo

app = Flask(__name__)

# Cors
CORS(app)

load_dotenv()

# Api
api = Api(app, '/api')

api.add_resource(Location, '/location', methods=['GET'])
api.add_resource(TransportInfo, '/transport', methods=['GET'])
