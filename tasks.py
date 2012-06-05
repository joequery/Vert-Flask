# Schedule and run functions at specified intervals.
from apscheduler.scheduler import Scheduler
from helpers import rss
from settings import *
import time

# Create scheduler object
sched = Scheduler()
sched.start()

# Create a task log we'll write to for debugging/info
taskLogFile = open("/tmp/vert_tasks.log", 'a', 0)

##################################################
# Cache the blog rss feed to decrease load time!
##################################################
@sched.interval_schedule(seconds=5)
def cache_blog_feed():
  rss.cache_feed(CACHE_DIR, BLOG_CACHE_FILE, NUM_BLOG_POSTS)
  taskLogFile.write("Feed cached at %s\n" % nicetime())

# Helper function for getting human current time
def nicetime():
  return time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())

# The amount of time slept is arbitrary, we just need to keep the script alive.
while True:
  time.sleep(10)

# Clean up
sched.shutdown()
taskLogFile.close()
