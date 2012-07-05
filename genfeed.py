# Generate an RSS feed. This should be done after creating a blog post.
import imp
import os
from pyquery import PyQuery
import time
from flask import render_template, current_app
from vertstudios import app
from xml.sax.saxutils import escape

currentDir = os.sep.join(os.path.realpath(__file__).split('/')[:-1])
BLOG_SYS_PATH = os.path.join(currentDir, "blog")

# Wrap a string in a CDATA block
def cdata(string):
  html = string.encode('ascii','xmlcharrefreplace').strip()
  return "<![CDATA[%s]]>" % escape(html)


# Get `numPosts` number of posts. Returns a list of dictionaries with the
# following attributes: title, excerpt, date, url, body
def get_posts(numPosts):
  with open('blog/rss.txt', 'r') as f:
    posts = [f.next().strip() for x in xrange(numPosts)]

  postList = []
  for post in posts:
    # Get all the data needed for the rss feed.
    metaPath = os.path.join(BLOG_SYS_PATH, "posts", post, 'meta.py')
    bodyPath = os.path.join("posts", post, 'body.html')
    metaData = imp.load_source('data', metaPath)

    postTime = time.strptime(metaData.time, "%Y-%m-%d %a %H:%M %p")
    postDict = {
      'title' : escape(metaData.title),
      'excerpt' : cdata(metaData.excerpt),
      'date' : time.strftime("%B %d, %Y", postTime), # January 15, 2012
      'url': "http://www.vertstudios.com/blog/%s" % post
    }
    with app.test_request_context():
      # Get the blog post body
      content = render_template(bodyPath, post=postDict)
      jQuery = PyQuery(content)
      body = jQuery("#blogPost .post").html()

      # Get the publication date into RFC822 format as specified in the RSS
      # 2.0 specifications.
      postDict['date'] = time.strftime("%a, %d %b %Y %H:%M:%S +0000", postTime)
      
      postDict['body'] = cdata(body)
      postList.append(postDict)

  return postList

# Generate an rss feed from a list of posts. We write this to a static xml file
# for speed. 
def gen_rss_feed(postList):
   
  # Get current time into RFC822 format for the last build date.
  lastBuild = time.strftime("%a, %d %b %Y %H:%M:%S +0000", time.gmtime())
 
  with app.test_request_context():
    rss = render_template("templates/rssgen.html", 
          lastBuild=lastBuild, 
          posts=postList)

  # Now write the rss to a file.
  feedPath = os.path.join(BLOG_SYS_PATH, "templates", "rssfeed.html")
  f = open(feedPath, 'w')
  f.write(rss)
  f.close()

posts = get_posts(10)
gen_rss_feed(posts)
