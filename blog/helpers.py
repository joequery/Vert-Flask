# Helper functions for the blog 
import os
import re
import imp
import time
from flask import render_template
from pyquery import PyQuery
import copy
from xml.sax.saxutils import escape

BLOG_SYS_PATH = os.sep.join(os.path.realpath(__file__).split('/')[:-1])

# Get `numPosts` number of posts. Returns a list of dictionaries with the
# following attributes: title, description, date, url, body
# Start from `start`, 0 indexed.
# get_posts(10, 10) gets posts 11-21
# app is the application object
def get_posts(app, numPosts, start=0):
  with open('blog/rss.txt', 'r') as f:
    posts = []

    # consume `start` number of lines to make sure we start at the right 
    # place in the file
    for x in xrange(start):
      try:
        f.next()
      except StopIteration:
        break

    # Now get `numPosts` number of post URLs
    for x in xrange(numPosts):
      try:
        posts.append(f.next().strip())
      except StopIteration:
        break
    f.close()

  postList = [] # We'll be populating this w/ dictionaries and returning 
  for post in posts:
    # Get all the data needed for the rss feed.
    metaPath = os.path.join(BLOG_SYS_PATH, "posts", post, 'meta.py')
    bodyPath = os.path.join("posts", post, 'body.html')
    metaData = imp.load_source('data', metaPath)

    # Old posts used a custom excerpt. Now the excerpt and description
    # are the same, labeled under "description".
    description = metaData.description or metaData.excerpt

    # Get url prefix of blog blueprint
    url_prefix = app.blueprints['blog'].url_prefix

    postTime = time.strptime(metaData.time, "%Y-%m-%d %a %H:%M %p")
    postDict = {
      'title' : metaData.title,
      'description' : description,
      'url': os.path.join(url_prefix, post),
      'pubDate': time.strptime(metaData.time, "%Y-%m-%d %a %H:%M %p")
    }
    postDict['comments'] = postDict['url'] + "#comments"

    with app.test_request_context():
      # Get the blog post body
      content = render_template(bodyPath, post=postDict)
      jQuery = PyQuery(content)
      body = jQuery("#blogPost .post").html()
      
      postDict['body'] = body
      postList.append(postDict)

  return postList

# Escape HTML and also escape jinja functions.
def escape_html(string):
  html = escape(string.encode('ascii','xmlcharrefreplace').strip())
  return "{% raw %}" + html + "{% endraw %}"

# Generate an rss feed from a list of posts. We write this to a static xml file
# for speed. app is the application object.
def gen_rss_feed(app, postList):
  posts = copy.deepcopy(postList) 
   
  # Get current time into RFC822 format for the last build date.
  lastBuild = time.strftime("%a, %d %b %Y %H:%M:%S +0000", time.gmtime())

  # Alter the contents of the posts to satisfy XML/RSS requirements.
  for post in posts:
    post['title'] = escape(post['title'])
    post['description'] = escape_html(post['description'])
    post['body'] = escape_html(post['body'])
    post['url'] = "http://vertstudios.com%s" % post['url']
    # RFC822 specifications.
    post['pubDate']=time.strftime("%a, %d %b %Y %H:%M:%S +0000",post['pubDate'])
 
  with app.test_request_context():
    rss = render_template("templates/rssfeed.html", 
          lastBuild=lastBuild, 
          posts=posts)

  return rss

# Credit to http://stackoverflow.com/a/250406/670823
def get_excerpt(string, charLimit):
  if len(string) <= charLimit:
    return string
  else:
    return string[:charLimit].rsplit(' ', 1)[0]+"..."

# Helper method for altering RSS feed content for preview purposes.  
def _alter_rss(rssObj):
  description = rssObj["description"]
  date = rssObj["pubDate"]
  title = rssObj["title"]

  ##############################################
  # Objective 1: Remove links from description.
  ##############################################

  pattern = r'<a\b[^>]*>([^<]+)<\/a>'
  description = re.sub(pattern, "\\1", description)


  ##############################################
  # Objective 2: Create description cutoff
  ##############################################
  description = get_excerpt(description, 90)

  ##############################################
  # Objective 3: Format date
  ##############################################
  date = time.strftime("%m/%d/%Y", date)

  # Now we replace the initial values of the object entries with our
  # changes.
  rssObj["description"] = description
  rssObj["pubDate"] = date

def from_the_blog():
  return render_template("templates/from_the_blog.static")
