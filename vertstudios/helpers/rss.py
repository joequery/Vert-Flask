# Generate HTML for the From the Blog section of the site. 

from pyquery import PyQuery
import requests
import re
import time
import json
import os
import sys
from jinja2 import Environment, PackageLoader

# Append parent dir to path
parentDir = os.path.abspath(__file__).rsplit('/', 2)[0]
import sys; sys.path.append(parentDir)

# Get the html for the rss_feed section on the home page.
# numPosts: An integer representing the number of posts we want to display.
def vert_rss_feed(numPosts):
  ##############################################################################
  # Create a series of helper functions that will only be used in this function.
  ##############################################################################

  ##############################################################################
  # Begin parsing!
  ##############################################################################

  # The blog feed URL
  feedURL = "http://www.vertstudios.com/blog/feed";

  # Get html from requests, PyQuery's constructor doesn't parse correctly.
  r = requests.get(feedURL)
  content = r.content

  # Create the jQuery object, just like we're used to!
  jQuery = PyQuery(content, parser="xml")

  # items are the elements that contain recent posts
  items = jQuery("item")
  
  # attributes we want from each story item.
  attributes = ["title", "link", "comments", "pubDate", "description"]

  recentStories = []
  # Extract particular attributes from each item.
  for item in items[:numPosts]:
    story = {}
    for attribute in attributes:
      story[attribute] = jQuery(item).children(attribute).html()

    # Apply a series of changes to the rss entry using the alter_css helper
    _alter_rss(story)
    recentStories.append(story)

  # Now generate and return the html to place in the template.
  # We use Jinja instead of Flask here so we can run this separate
  # from the app.
  env = Environment(loader=PackageLoader("vertstudios", "templates"))
  template = env.get_template("partials/rss_feed.html")
  return template.render(stories=recentStories)


# Helper method for altering RSS feed content for preview purposes.  
def _alter_rss(rssObj):
  description = rssObj["description"]
  date = rssObj["pubDate"]
  title = rssObj["title"]

  ##############################################
  # Objective 1: Remove links from description.
  ##############################################

  pattern = r'<a\b[^>]*>([^<]+)<\/a>'
  description = re.sub(pattern, "\\1", description)


  ##############################################
  # Objective 2: Create description cutoff
  ##############################################

  # Credit to http://stackoverflow.com/a/250406/670823
  charLimit = 90
  description = description[:charLimit].rsplit(' ', 1)[0]+"..."

  ##############################################
  # Objective 3: Format date
  ##############################################
  date = time.strftime("%m/%d/%Y")

  # Now we replace the initial values of the object entries with our
  # changes.
  rssObj["description"] = description
  rssObj["pubDate"] = date

# Write feed to file in JSON format
def cache_feed(cacheDir, numPosts):
  recentStories = vert_rss_feed(numPosts)
  feedJSON = json.dumps(recentStories)
  print(feedJSON)
  fileName = "feed.json"
  #f = open(os.path.join(cacheDir, fileName), 'w')
  #f.write(feedJSON)
  #f.close()
