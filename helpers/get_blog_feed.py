# Get the vert studios blog feed
from pyquery import PyQuery

def vert_rss_feed():
  # The blog feed URL
  feedURL = "http://www.vertstudios.com/blog/feed";

  # Create the jQuery object, just like we're used to!
  jQuery = PyQuery(url=feedURL)

  # items are the elements that contain recent posts
  items = jQuery("item")

  # Recent stories list
  recentStories = []

  # Little helper method for getitng an post attribute.
  def post_attr(item, attr):
    return jQuery(item).children(attr).html()

  # Extract particular attributes from each item.
  for item in items:
    #title = post_attr(item, "title")
    #url = post_attr(item, "link")
    url = jQuery(item).children()
    print(url)
