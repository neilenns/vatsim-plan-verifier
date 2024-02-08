#!/bin/sh
set -o nounset

echo "Starting nginx..."
## The single quotes around the nginx -g option are important,
## otherwise the command fails. The semicolon is required too.
nginx -g 'daemon off;'