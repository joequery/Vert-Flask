##########################
# The blog!
##########################
from flask import (
 Blueprint, render_template, abort, request, flash   
)

blog = Blueprint('blog', __name__, template_folder="templates")

@blog.route('/blog/')
@blog.route('/blog')
def blog_index():
  return render_template("blog_index.html")

@blog.route('/blog/<post>')
def blog_post(post):
  try:
    return render_template("blog_posts/%s.html" % post)
  except TemplateNotFound:
    return page_not_found(TemplateNotFound)

