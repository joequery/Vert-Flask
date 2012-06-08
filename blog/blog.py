from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound

blog = Blueprint('blog', __name__, template_folder='blog_templates')

@blog.route('/blog')
def blog_home():
  return render_template("blog_index.html")


