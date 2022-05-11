import traceback
from flask import request
from flask_restful import Resource
import requests
import json


class TransportInfo(Resource):
    def get(self):
        try:
            line_id = request.args.get('id')
            response = requests.get(
                f"https://www.granderecife.pe.gov.br/sitegrctm/custom/request/request-get.php?url=http%3A%2F%2F200.238.99.12%3A51768%2Fquadro_horarios.php%3Flinha%3D{line_id}")
            return {'data': json.loads(response.text)}
        except:
            traceback.print_exc()
            return {'data': None}
