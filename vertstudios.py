# Vert studios website. Yay!

from settings import *
from flask import Flask, render_template, request, g, abort
from helpers.rss import get_blog_feed
from flaskext.markdown import Markdown
from jinja2 import TemplateNotFound
app = Flask(__name__)
Markdown(app)

# Get a bodyID for CSS purposes
@app.before_request
def before_request():
  def get_body_id():
    if request.path == '/':
      g.bodyID = "index"
    else:
      g.bodyID = request.path[1:]

  get_body_id()


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

@app.route('/contact')
def contact():
  return render_template("contact.html")

##########################
# The blog!
##########################
@app.route('/blog')
def blog_index():
  return render_template("blog_index.html")

@app.route('/blog/<post>')
def blog_post(post):
  return render_template("blog_posts/%s.html" % post)


if __name__ == "__main__":
	app.run(debug=True)
