import os

# We're 2 away from the parent directory (PARENT/tasks/somefile.py)
parentDir = os.path.abspath(__file__).rsplit('/', 2)[0]
import sys; sys.path.insert(0, parentDir)
import helpers

print(dir(helpers))
