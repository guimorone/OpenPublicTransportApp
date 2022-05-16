import traceback
from flask import request
from flask_restful import Resource
import requests
import os
import json
from urllib.request import urlopen
from bs4 import BeautifulSoup


class WebScraping(Resource):
    def web_scraping(self, url):
        html = urlopen(url)
        bs = BeautifulSoup(html, "html.parser")
        print(bs.prettify())

    def get(self, url=None):
        try:
            self.web_scraping(
                "http://itinerario.granderecife.pe.gov.br/site/consulta/itinerarios.asp"
            )
        except:
            traceback.print_exc()
            return {"data": None}
