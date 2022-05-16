from urllib.request import urlopen
from bs4 import BeautifulSoup


def web_scraping(url):
    html = urlopen("url")
    bs = BeautifulSoup(html, "html.parser")
    print(bs.prettify())

