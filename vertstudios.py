# Vert studios website. Yay!

from flask import Flask, render_template
from helpers import vert_rss_feed
app = Flask(__name__)

@app.route('/')
def home():
  # Get HTML for the home page rss feed
  rssFeed = vert_rss_feed(10)
  return render_template("index.html", rssFeed=rssFeed)

@app.route('/work')
def work():
  return render_template("work.html")

if __name__ == "__main__":
	app.run(debug=True)
