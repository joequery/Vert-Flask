# Global setting variables and etc go here.
import os

# Where cache files are stored
CACHE_DIR = "/tmp"

#######################################################
# Blog posts on home page
#######################################################
NUM_BLOG_POSTS = 5
BLOG_CACHE_FILE = "vert_rss.json"
FEED_CACHE_TIME = 3600 # 1 hour blog feed cache

# FLASK_ENV environment variable can be 'development' or 'production'
if "FLASK_ENV" in os.environ.keys():
	FLASK_ENV = os.environ["FLASK_ENV"]
else:
	FLASK_ENV = "development"
