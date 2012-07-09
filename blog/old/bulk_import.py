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
#posts = posts[4:1]

def get_attr(post, attr):
  html = jQuery(post).children(attr).html()
  if html:
  	html = html.encode('ascii','xmlcharrefreplace').strip()
  else:
  	html = ''
  return html

for post in posts:
  title = get_attr(post, "title")
  link = get_attr(post, "link")
  pubdate = get_attr(post, "pubdate")
  guid = get_attr(post, "guid")
  description = get_attr(post, "description")
  content = get_attr(post, "content")
  excerpt = get_attr(post, "excerpt")

  ##################################################################
  # Prepare variables
  ##################################################################

  # Isolate the url, since this will become our directory.
  # http://www.vertstudios.com/blog/some-post => some-post
  # We ultimately want posts/some-post/
  directory = os.path.join("posts", link.split('/')[-2])

  # Parse the date provided into a time object. 
  # "Sat, 06 Feb 2010 07:41:48 +0000" =>  "06 Feb 2010 07:41:48"
  pubdate = pubdate.split(',')[1][:-5].strip()
  pubdateObj = strptime(pubdate, "%d %b %Y %H:%M:%S")

  # With the time object, we can now put the date in the form of the timestamp
  # we'll use when writing articles: 2012-07-03 Tue 04:37 PM
  pubdate = strftime("%Y-%m-%d %a %H:%M %p", pubdateObj)

  # Get the post content into markdown. Get rid of unicode spaces
  #content = content.replace(u'\xa0', u' ')

  # posts/some-post/body.html
  bodyfilePath = os.path.join(directory, "body.html")
  metafilePath = os.path.join(directory, "meta.py")

  ##################################################################
  # Begin execution!
  ##################################################################

  #os.mkdir(directory)

  bodyfile = open(bodyfilePath, 'w')
  metafile = open(metafilePath, 'w')

  # Write the body
  bodyfile.write(
"""{% extends "templates/post.html" %}
{% block post %}
{% filter markdown %}


[{{post['title']}}]({{post['url']}})
======================================
{% endfilter %}

"""
  )
  bodyfile.write(content.encode('ascii','xmlcharrefreplace'))
  bodyfile.write(
"""
{% endblock post %}\n
"""
  )

  # Write the metadata

  metafile.write(
"""
title=\"\"\"%s\"\"\"
description=\"\"\"%s\"\"\"
time=\"\"\"%s\"\"\"
excerpt=\"\"\"%s\"\"\" \n
""" % (title, description, pubdate, excerpt)
  )

  ##################################################################
  # Clean up
  ##################################################################

  bodyfile.close()
  metafile.close()
  print("Wrote %s" % directory)
