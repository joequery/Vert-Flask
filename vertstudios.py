# Vert studios website. Yay!

from flask import Flask, render_template, request, g
from helpers.rss import vert_rss_feed
app = Flask(__name__)

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
  rssFeed = vert_rss_feed(10)
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

if __name__ == "__main__":
	app.run(debug=True)
