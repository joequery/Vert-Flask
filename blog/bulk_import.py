# Bulk import wordpress posts 

from pyquery import PyQuery
from html2text import html2text
from time import strptime, strftime
import os

# Get the xml file contents into a PyQuery object for parsing.
f = open('wpblog.xml', 'r')
jQuery = PyQuery(f.read())
f.close()

posts = jQuery("item")
posts = posts[0:1]


for post in posts:
  title = jQuery(post).children("title").html()
  link = jQuery(post).children("link").html()
  pubdate = jQuery(post).children("pubdate").html()
  guid = jQuery(post).children("guid").html()
  description = jQuery(post).children("description").html()
  content = jQuery(post).children("content").html()
  excerpt = jQuery(post).children("excerpt").html()

  # Isolate the url, since this will become our directory.
  # http://www.vertstudios.com/blog/some-post => some-post
  # We ultimately want posts/some-post/
  directory = os.path.join("posts", link.split('/')[-2])

  # Parse the date provided into a time object. We start off with
  # Sat, 06 Feb 2010 07:41:48 +0000. We get rid of Sat, and the +0000
  pubdate = pubdate.split(',')[1].strip()[:-6]

  # Now we have "06 Feb 2010 07:41:48", which is parseable.
  pubdateObj = strptime(pubdate, "%d %b %Y %H:%M:%S")

  # With the time object, we can now put the date in the form of the timestamp
  # We'll use when writing articles: 2012-07-03 Tue 04:37 PM
  pubdate = strftime("%Y-%m-%d %a %H:%M %p", pubdateObj)

  # Get the post content into markdown.
  markdown = html2text(content)

  os.mkdir(directory)
