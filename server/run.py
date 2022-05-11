from app import app
from livereload import Server

# We only need this for local development.
if __name__ == '__main__':
    server = Server(app.wsgi_app)
    server.serve()