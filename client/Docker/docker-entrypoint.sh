#!/bin/sh
set -o nounset

## This script injects env variables into a react app
## The script runs in the docker container just before react starts up
## The output of this is script is appended to /public/env_vars.js which
## is made accessible to typescript via index.html

echo "Injecting env vars into react app..."
echo "SERVER_URL=$SERVER_URL"

cat <<EOF > /usr/share/nginx/html/env_vars.js
window.SERVER_URL="$SERVER_URL";
EOF

echo "Starting nginx..."
## The single quotes around the nginx -g option are important,
## otherwise the command fails. The semicolon is required too.
nginx -g 'daemon off;'