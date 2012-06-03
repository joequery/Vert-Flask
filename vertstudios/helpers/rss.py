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

# Get the vert blog feed via rss. Attempt to return a cached version
# of the feed if available.
# cacheDir: The cached feed's directory
# cacheFile: The filename of the feed cache
# numPosts: How many posts we want to retrieve
def get_blog_feed(cacheDir, cacheFile, numPosts):

  # See if we can get the feed from the file. If not, get the feed manually
  # and cache it ourselves.
  try:
    open(os.path.join(cacheDir, cacheFile))
    storyList = read_cache(cacheDir, cacheFile)
  except IOError as e:
    storyList = cache_feed(cacheDir, cacheFile, numPosts)

  # return the html for the story list
  return stories_to_html(storyList)

# Return a list of stories from the vert RSS feed
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

    # Apply a series of changes to the rss entry using the alter_rss helper
    _alter_rss(story)
    recentStories.append(story)

  return recentStories

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



# Get the html from a list of stories
def stories_to_html(recentStories):
  # We use Jinja instead of Flask here so we can run this separate
  # from the app.
  env = Environment(loader=PackageLoader("vertstudios", "templates"))
  template = env.get_template("partials/rss_feed.html")
  return template.render(stories=recentStories)


# Write feed to file in JSON format
def cache_feed(cacheDir, fileName, numPosts):
  recentStories = vert_rss_feed(numPosts)
  feedJSON = json.dumps(recentStories)
  f = open(os.path.join(cacheDir, fileName), 'w')
  f.write(feedJSON)
  f.close()
  return recentStories

# Read feed file and return a list of stories
def read_cache(cacheDir, fileName):
  f = open(os.path.join(cacheDir, fileName))
  feedJSON = f.read()
  f.close()
  recentStories = json.loads(feedJSON)
  return recentStories 
