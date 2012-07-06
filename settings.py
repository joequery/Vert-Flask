# Global setting variables and etc go here.
import os
from flask import Flask, request, g, render_template
from flaskext.markdown import Markdown

SECRET_KEY = "1ZLsDDIpqQ1rKXiwoEIHMEtjNj-dmrMLyDIXvLEQjeeaCpJyI9T8G6rxRDYMIkwWxIQ="

# App configuration
app = Flask(__name__)
app.secret_key = SECRET_KEY
Markdown(app)

# FLASK_ENV environment variable can be 'development' or 'production'
if "FLASK_ENV" in os.environ.keys():
	FLASK_ENV = os.environ["FLASK_ENV"]
else:
	FLASK_ENV = "development"

if FLASK_ENV == "production":
  app.debug = False
else:
  app.debug = True

@app.before_request
def before_request():
  def get_body_id():
    if request.path == '/':
      g.bodyID = "index"
    
    # The contact page was styled with a body id of work, and i don't 
    # feel like taking the time to fix the styles to make it match.
    elif request.path == '/contact':
      g.bodyID = "work"

    # Else, just get the first part of the path name as the bodyID.
    else:
      g.bodyID = request.path[1:].split('/')[0]

  # Grant access to the dev/production environment variable
  def get_env():
    g.env = FLASK_ENV

  # Determine cloudfront vs local assets delivery
  def set_assets_dir():
    if FLASK_ENV == "production":
      g.assets = "https://s3.amazonaws.com/assets.vertstudios.com"
    else:
      g.assets = app.static_url_path

  get_body_id()
  get_env()
  set_assets_dir()
  

@app.errorhandler(404)
def page_not_found(e):
      return render_template('404.html'), 404

