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
  metaPath = os.path.join(BLOG_SYS_PATH, postDir, 'meta')
  bodyPath = os.path.join(postDir, 'body')

  try:
    # Use the 'imp' module to import the meta file as module
    # This way, we can easily define metadata without having to parse!
    f = open(metaPath, 'r')
    meta = imp.load_source('data', '', f)
    f.close()
    return render_template(bodyPath, meta=meta)
  except (TemplateNotFound, IOError) as e:
    return render_template('404.html'), 404

