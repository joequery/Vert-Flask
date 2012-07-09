#!/bin/bash

# Compress css 
rm -f static/css/compress*

cat static/css/reset.css static/css/js.css static/css/text.css static/css/main.css static/css/codestream.css static/css/prettify.css > static/css/compressed.css

java -jar /usr/local/yuicompress --type css static/css/compressed.css -o static/css/compressed.min.css


# Compress javascript
cat static/js/jsCSS.js static/js/index_init.js static/js/easing.js static/js/slaveshow.min.js static/js/carousel.js static/js/carousel-init.js static/js/easing.js static/js/Scroller.js static/js/work_init.js static/js/contact.js static/js/prettify.js > static/css/compressed.js

java -jar /usr/local/yuicompress --type js static/js/compressed.js -o static/js/compressed.min.js
