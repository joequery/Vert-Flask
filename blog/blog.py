##########################
# The blog!
##########################
from flask import (
 Blueprint, render_template, abort, request, flash, make_response
)
from jinja2 import TemplateNotFound
from markdown import markdown
import os
import imp
import time
from helpers import get_posts
from settings import app

blog = Blueprint('blog', __name__, template_folder="./")

ThisFilePath = os.path.realpath(__file__)
BLOG_SYS_PATH = os.sep.join(ThisFilePath.split('/')[:-1])

@blog.route('/blog/')
@blog.route('/blog')
def blog_index():
  posts = get_posts(app, 10, 0)
  print(posts)

  return render_template("templates/blog_index.html")

@blog.route('/blog/<post>/')
@blog.route('/blog/<post>')
def blog_post(post):
  postDir = os.path.join("posts", post)
  metaPath = os.path.join(BLOG_SYS_PATH, postDir, 'meta.py')
  bodyPath = os.path.join(postDir, 'body.html')

  try:
    # Use the 'imp' module to import the meta file as module
    # This way, we can easily define metadata without having to parse!
    metaData = imp.load_source('data', metaPath)

    # Get the timestamp into a time object so we can display it however we want
    postTime = time.strptime(metaData.time, "%Y-%m-%d %a %H:%M %p")
    postData = {
      'title' : metaData.title,
      'description' : metaData.description,
      'date' : time.strftime("%B %d, %Y", postTime), # January 15, 2012
      'url': "/blog/%s" % post
    }
    return render_template(bodyPath, post=postData)
  #except (TemplateNotFound, IOError) as e:
  except None as e:
    return render_template('404.html'), 404

@blog.route('/blog/feed')
@blog.route('/blog/feed/')
def rss_feed():
  response = make_response(render_template("templates/rssfeed.static"))
  response.headers['Content-Type'] = "text/xml; charset=UTF-8"
  return response
