# Generate an RSS feed. This should be done after creating a blog post.
import imp
import os
from pyquery import PyQuery
import time
from flask import render_template, current_app
from vertstudios import app
from xml.sax.saxutils import escape
import re
import copy

currentDir = os.sep.join(os.path.realpath(__file__).split('/')[:-1])
BLOG_SYS_PATH = os.path.join(currentDir, "blog")
# Get `numPosts` number of posts. Returns a list of dictionaries with the
# following attributes: title, description, date, url, body
# Start from `start`, 0 indexed.
# get_posts(10, 10) gets posts 11-21
def get_posts(numPosts, start=0):
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

    postTime = time.strptime(metaData.time, "%Y-%m-%d %a %H:%M %p")
    postDict = {
      'title' : metaData.title,
      'description' : metaData.excerpt,
      'url': "http://www.vertstudios.com/blog/%s" % post
    }
    postDict['comments'] = postDict['url'] + "#comments"

    with app.test_request_context():
      # Get the blog post body
      content = render_template(bodyPath, post=postDict)
      jQuery = PyQuery(content)
      body = jQuery("#blogPost .post").html()

      # Get the publication date into RFC822 format as specified in the RSS
      # 2.0 specifications.
      postDict['pubDate'] = time.strftime("%a, %d %b %Y %H:%M:%S +0000", postTime)
      
      postDict['body'] = body
      postList.append(postDict)

  return postList

# Wrap a string in a CDATA block
def cdata(string):
  html = string.encode('ascii','xmlcharrefreplace').strip()
  return "<![CDATA[%s]]>" % escape(html)

# Generate an rss feed from a list of posts. We write this to a static xml file
# for speed. 
def gen_rss_feed(postList):
  posts = copy.deepcopy(postList) 
   
  # Get current time into RFC822 format for the last build date.
  lastBuild = time.strftime("%a, %d %b %Y %H:%M:%S +0000", time.gmtime())

  # Alter the contents of the posts to satisfy XML/RSS requirements.
  for post in posts:
    post['title'] = escape(post['title'])
    post['description'] = cdata(post['description'])
    post['body'] = cdata(post['body'])
 
  with app.test_request_context():
    rss = render_template("templates/rssfeed.html", 
          lastBuild=lastBuild, 
          posts=posts)

  return rss

# Write an rss feed to the appropriate file
def write_rss_feed(rss):
  feedPath = os.path.join(BLOG_SYS_PATH, "templates", "rssfeed.static")
  f = open(feedPath, 'w')
  f.write(rss)
  f.close()

# Write the 'from the blog' html.
def write_from_the_blog(posts):
  stories = copy.deepcopy(posts) 
  for story in stories:
    _alter_rss(story)

  # Get the rendered html from from_the_blog_gen
  with app.test_request_context():
    html = render_template("templates/from_the_blog.html", stories=stories)
  
  # Write the html to from_the_blog to call from the home page.
  feedPath = os.path.join(BLOG_SYS_PATH, "templates", "from_the_blog.static")
  f = open(feedPath, 'w')
  f.write(html)
  f.close()
    

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

  # Credit to http://stackoverflow.com/a/250406/670823
  charLimit = 90
  description = description[:charLimit].rsplit(' ', 1)[0]+"..."

  ##############################################
  # Objective 3: Format date
  ##############################################
  date = time.strptime(date, "%a, %d %b %Y %H:%M:%S +0000")
  date = time.strftime("%m/%d/%Y", date)

  # Now we replace the initial values of the object entries with our
  # changes.
  rssObj["description"] = description
  rssObj["pubDate"] = date

posts = get_posts(10)
write_from_the_blog(posts)
rss = gen_rss_feed(posts)
write_rss_feed(rss)
