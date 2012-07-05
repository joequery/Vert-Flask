# Global setting variables and etc go here.
import os
from flask import Flask
from flaskext.markdown import Markdown
from private import SECRET_KEY

# App configuration
app = Flask(__name__)
app.secret_key = SECRET_KEY
Markdown(app)

# FLASK_ENV environment variable can be 'development' or 'production'
if "FLASK_ENV" in os.environ.keys():
	FLASK_ENV = os.environ["FLASK_ENV"]
else:
	FLASK_ENV = "development"
