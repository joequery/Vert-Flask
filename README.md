Vert Studios - Powered by Flask!
--------------------------------

This repository holds the source code for http://vertstudios.com.
See more details about the project (including Nginx configuration) via
[Converting a simple website to Python Flask][0]:

[0]: http://vertstudios.com/blog/new-flask-site/

Requirements
------------

* Python 2.7
* [virtualenv](http://www.virtualenv.org/en/latest/index.html)
* lxml2 (Go [here][1] if you're having trouble installing on Ubuntu)

[1]: http://www.calazan.com/errors-when-installing-the-python-lxml-library-using-pip-on-ubuntu/

Installation and Usage
----------------------

    $ git clone git://github.com/joequery/Vert-Flask.git
    $ cd Vert-Flask
    $ virtualenv env
    $ . env/bin/activate
    $ pip install -r requirements.txt
    $ python genfeed.py # Generate rss feed and blog pagination
    $ python vertstudios.py

Now visit http://localhost:5000 in your browser.

Making a blog post
------------------

To make a blog post, follow these steps:

    $ cd Vert-Flask/blog/posts
    $ cp -r example my-post-url
    $ cd my-post-url

Now edit meta.py to have the proper metadata information. The publication date
should be in the following format: 2012-07-09 Mon 11:21 AM.

You can append the following to your ```~/.vimrc``` to generate such a 
timestamp using F3

    " Insert timestamp
    nmap <F3> a<C-R>=strftime("%Y-%m-%d %a %I:%M %p")<CR><Esc>
    imap <F3> <C-R>=strftime("%Y-%m-%d %a %I:%M %p")<CR>

You should be able to view the post at http://localhost:5000/blog/my-post-url.

Once you are finished with the post, you can add the post to the RSS feed and
pagination by adding "my-post-url" to the top of Vert-Flask/blog/rss.txt, 
and then executing `python genfeed.py` from the project root. Make sure you 
have virtualenv activated, otherwise you'll receieve an error.

The RSS feed and blog index pages are not versioned, so be sure you run the
`genfeed.py` script after every pull onto your live server.
