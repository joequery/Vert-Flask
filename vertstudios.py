# Vert studios website. Yay!

from settings import *
from flask import Flask, render_template, request, g, abort
from helpers.rss import get_blog_feed
from helpers.contact import ContactForm
from flaskext.markdown import Markdown
from jinja2 import TemplateNotFound
app = Flask(__name__)
Markdown(app)

@app.before_request
def before_request():
  def get_body_id():
    if request.path == '/':
      g.bodyID = "index"
    else:
      g.bodyID = request.path[1:].split('/')[0]

  # Grant access to the dev/production environment variable
  def get_env():
    g.env = FLASK_ENV

  # Determine cloudfront vs s3 content delivery
  def set_assets_dir():
    if FLASK_ENV == "production":
      g.assets = "http://assets.vertstudios.com"
    else:
      g.assets = "http://s3.amazonaws.com/assets.vertstudios.com"

  get_body_id()
  get_env()
  set_assets_dir()
  

@app.errorhandler(404)
def page_not_found(e):
      return render_template('404.html'), 404


#####################################################################
# Routes
#####################################################################

@app.route('/')
def home():
  # Get HTML for the home page rss feed
  rssFeed = get_blog_feed(CACHE_DIR, BLOG_CACHE_FILE, NUM_BLOG_POSTS)
  return render_template("index.html", rssFeed=rssFeed)

@app.route('/work')
def work():
  return render_template("work.html")

@app.route('/services')
def services():
  return render_template("services.html")

@app.route('/about')
def about():
  return render_template("about.html")

@app.route('/contact', methods=['GET', 'POST'])
def contact():
  form = ContactForm(request.form)
  return render_template("contact.html", form=form)

##########################
# The blog!
##########################
@app.route('/blog/')
@app.route('/blog')
def blog_index():
  return render_template("blog_index.html")

@app.route('/blog/<post>')
def blog_post(post):
  try:
    return render_template("blog_posts/%s.html" % post)
  except TemplateNotFound:
    return page_not_found(TemplateNotFound)


if __name__ == "__main__":
	app.run(debug=True)
