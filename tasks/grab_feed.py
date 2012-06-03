import os

# Hack to import modules from a sibling directory. Ew >_>
# parentDir is just the root directory of the project.
parentDir = os.path.abspath(__file__).rsplit('/', 2)[0]
vertDir = os.path.join(parentDir, "vertstudios")
import sys; sys.path.append(vertDir)
import helpers.rss

print(dir(helpers.rss))
