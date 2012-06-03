##################################################
# Cache the blog rss feed to decrease load time!
##################################################
import os

# Hack to import modules from a sibling directory. Ew >_>
# parentDir is just the root directory of the project.
parentDir = os.path.abspath(__file__).rsplit('/', 2)[0]
vertDir = os.path.join(parentDir, "vertstudios")
import sys; sys.path.append(vertDir)
import helpers.rss
from time import sleep
from settings import *

helpers.rss.cache_feed(CACHE_DIR, BLOG_CACHE_FILE, NUM_BLOG_POSTS)
