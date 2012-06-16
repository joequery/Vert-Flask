##########################
# The blog!
##########################
from flask import (
 Blueprint, render_template, abort, request, flash   
)
from jinja2 import TemplateNotFound

blog = Blueprint('blog', __name__, template_folder="./")

@blog.errorhandler(404)
def page_not_found(e):
      return render_template('404.html'), 404

@blog.route('/blog/')
@blog.route('/blog')
def blog_index():
  return render_template("templates/blog_index.html")

@blog.route('/blog/<post>')
def blog_post(post):
  try:
    return render_template("posts/%s.html" % post)
  except TemplateNotFound:
    return page_not_found(TemplateNotFound)

