# View helpers to be used throughtout the site

from pyquery import PyQuery
import requests
import re
import time
from flask import render_template, request

# Get the html for the rss_feed section on the home page.
# numPosts: An integer representing the number of posts we want to display.
def vert_rss_feed(numPosts):
  ##############################################################################
  # Create a series of helper functions that will only be used in this function.
  ##############################################################################

  # Helper method for getting a post attribute.
  def post_attr(item, attr):
    return jQuery(item).children(attr).html()

  # Helper method for altering RSS feed content for preview purposes.  
  def alter_rss(rssObj):
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
      story[attribute] = post_attr(item, attribute)

    # Apply a series of changes to the rss entry using the alter_css helper
    alter_rss(story)
    recentStories.append(story)

  # Now generate and return the html to place in the template.
  return render_template("partials/rss_feed.html", stories=recentStories)

