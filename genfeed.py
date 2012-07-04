# Generate an RSS feed. This should be done after creating a blog post.
import imp
import os
from pyquery import PyQuery
import time
from flask import render_template, current_app
from vertstudios import app

currentDir = os.sep.join(os.path.realpath(__file__).split('/')[:-1])
BLOG_SYS_PATH = os.path.join(currentDir, "blog")
NUM_POSTS = 10

with open('blog/rss.txt', 'r') as f:
  posts = [f.next().strip() for x in xrange(NUM_POSTS)]

postList = []
for post in posts:
  # Get all the data needed for the rss feed.
  metaPath = os.path.join(BLOG_SYS_PATH, "posts", post, 'meta.py')
  bodyPath = os.path.join("posts", post, 'body.html')
  metaData = imp.load_source('data', metaPath)

  postTime = time.strptime(metaData.time, "%Y-%m-%d %a %H:%M %p")
  postDict = {
    'title' : metaData.title,
    'description' : metaData.description,
    'date' : time.strftime("%B %d, %Y", postTime), # January 15, 2012
    'url': "/blog/%s" % post
  }
  with app.test_request_context():
    # Get the blog post body
    content = render_template(bodyPath, post=postDict)
    jQuery = PyQuery(content)
    body = jQuery("#blogPost .post").html()

    # Get the publication date into RFC822 format as specified in the RSS
    # 2.0 specifications.
    postDict['date'] = time.strftime("%a, %d %b %Y %H:%M:%S +0000", postTime)
    
    postDict['body'] = body
    postList.append(postDict)


print(postList)
