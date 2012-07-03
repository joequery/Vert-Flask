# Bulk import wordpress posts 

from pyquery import PyQuery
from html2text import html2text

# Get the xml file contents into a PyQuery object for parsing.
f = open('wpblog.xml', 'r')
jQuery = PyQuery(f.read())
f.close()

posts = jQuery("item")
posts = posts[0:25]


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
  link = link.split('/')[-2]

  print(link)
