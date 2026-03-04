#!/bin/bash
# Run this on the website server (e.g. in /var/www/chakki-website) after you push to GitHub.
# Usage: sudo ./deploy-on-server.sh

set -e
cd "$(dirname "$0")"
git pull origin main
chown -R www-data:www-data .
echo "Done. Site updated."
