# Vert studios website. Yay!

from settings import *
from flask import Flask, render_template, request, g
from helpers.rss import get_blog_feed
from blog.blog import blog
app = Flask(__name__)
app.register_blueprint(blog)

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

if __name__ == "__main__":
	app.run(debug=True)
