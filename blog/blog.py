##########################
# The blog!
##########################
from flask import (
 Blueprint, render_template, abort, request, flash   
)
from jinja2 import TemplateNotFound
from markdown import markdown
import os
import imp
import time

blog = Blueprint('blog', __name__, template_folder="./")

ThisFilePath = os.path.realpath(__file__)
BLOG_SYS_PATH = os.sep.join(ThisFilePath.split('/')[:-1])

@blog.route('/blog/')
@blog.route('/blog')
def blog_index():
  return render_template("templates/blog_index.html")

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
    postTime = time.strptime(metaData.time, "%Y-%m-%d %a %I:%M %p")
    post = {
      'title' : metaData.title,
      'description' : metaData.description,
      'date' : time.strftime("%B %d, %Y", postTime) # January 15, 2012
    }
    return render_template(bodyPath, post=post)
  except (TemplateNotFound, IOError) as e:
    return render_template('404.html'), 404

