# Generate an RSS feed. This should be done after creating a blog post.
import os
from vertstudios import app
from blog.helpers import (
    get_posts, BLOG_SYS_PATH, gen_rss_feed, _alter_rss, get_excerpt
)
from flask import render_template, current_app,g 
import copy
import time
from settings import before_request

currentDir = os.sep.join(os.path.realpath(__file__).split('/')[:-1])
BLOG_SYS_PATH = os.path.join(currentDir, "blog")
    
# Write an rss feed to the appropriate file
def write_rss_feed(rss):
  feedPath = os.path.join(BLOG_SYS_PATH, "templates", "rssfeed.static")
  f = open(feedPath, 'w')
  f.write(rss)
  f.close()
  print("Generated static rss feed")

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
  print("Generated 'from the blog' static file")

def write_index_pages(postsPerPage):
  i=1
  #posts = get_posts(app, postsPerPage)
  posts = get_posts(app, 10)
  while posts:
    for post in posts:
      # If a post doesn't have a description, get an excerpt from the body.
      if not post['description']:
        post['description'] = get_excerpt(post['body'], 100)
       
      # Make the date in the form '04/25/2012'
      post['pubDate'] = time.strftime("%m/%d/%Y", post['pubDate'])

    pagePath = os.path.join(BLOG_SYS_PATH, "pages", "page%d.static" % i)
    with app.test_request_context():
      before_request()
      html = render_template("templates/blog_index.html", posts=posts)
      f = open(pagePath, 'w')
      f.write(html)
      f.close()
      i += 1
      posts = get_posts(app, postsPerPage, postsPerPage * i - 1)
  print("Generated static blog pages")


posts = get_posts(app, 10)
rss = gen_rss_feed(app, posts)
write_rss_feed(rss)
write_from_the_blog(posts)
write_index_pages(10)
