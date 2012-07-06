# Vert studios website. Yay!

from settings import FLASK_ENV, app
from flask import (
 request, g, abort, flash, redirect, 
 render_template, url_for
)
from contact.contact import contact_page
from blog.blog import blog
from blog.helpers import from_the_blog
from jinja2 import TemplateNotFound

app.register_blueprint(contact_page)
app.register_blueprint(blog)

#####################################################################
# Routes
#####################################################################

@app.route('/')
def home():
  # Get HTML for the home page rss feed
  rssFeed = from_the_blog()
  return render_template("index.html", rssFeed=rssFeed)

@app.route('/work')
def work():
  return render_template("work.html", title="Work")

@app.route('/services')
def services():
  return render_template("services.html", title="Services")

@app.route('/about')
def about():
  return render_template("about.html", title="About")


if __name__ == "__main__":
	app.run()
