# Generate an RSS feed. This should be done after creating a blog post.
import os
from vertstudios import app
from blog.helpers import (
    get_posts, BLOG_SYS_PATH, gen_rss_feed, _alter_rss
)
from flask import render_template
import copy

currentDir = os.sep.join(os.path.realpath(__file__).split('/')[:-1])
BLOG_SYS_PATH = os.path.join(currentDir, "blog")
    
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

posts = get_posts(app, 10)
rss = gen_rss_feed(app, posts)
write_rss_feed(rss)
write_from_the_blog(posts)
