import traceback
from flask import request
from flask_restful import Resource
import requests
import os
import json


class Location(Resource):
    def get(self):
        try:
            lat, lng = request.args.get('lat'), request.args.get('lng')
            response = requests.get(
                f"https://us1.locationiq.com/v1/reverse.php?key={os.getenv('LOCATION_IQ_ACCESS_TOKEN')}&lat={lat}&lon={lng}&format=json")
            data = json.loads(response.text).get('address')
            return({
                'data': {
                    'city': data.get('city'),
                    'state': data.get('state'),
                    'lat': lat,
                    'lng': lng
                }
            })
        except:
            traceback.print_exc()
            return ({'data': None})
