#!/bin/sh

# compile the sass (requires sass)
sass sass/index.scss index.css

# minify the js (requires minify)
minify js/*.js > min.js
