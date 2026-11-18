#!/bin/sh
# Starts the website's Toast menu sync on GitHub. IONOS runs this every hour (install-timer.sh adds
# the crontab line), because GitHub's own hourly schedule skips most runs. GitHub then runs the
# deploy workflow as a menu-only run, which redeploys only if the menu changed.
#
# The deploy workflow puts these next to this script, readable only by the hosting account:
#   repository   the GitHub repository, e.g. svemula17/athidhi-website
#   auth-header  "Authorization: Bearer <token>": a fine-grained GitHub token for that repository
#                only, with Actions: Read and write (the MENU_SYNC_TOKEN secret)
set -eu

dir=$(dirname "$0")
repository=$(cat "$dir/repository")
api=${GITHUB_API:-https://api.github.com}

# The token is read from the file by curl, so it never shows up in the server's process list.
status=$(curl --silent --show-error --max-time 30 --output "$dir/last-response" --write-out '%{http_code}' \
  --request POST "$api/repos/$repository/actions/workflows/pages.yml/dispatches" \
  --header @"$dir/auth-header" \
  --header "Accept: application/vnd.github+json" \
  --header "X-GitHub-Api-Version: 2022-11-28" \
  --header "User-Agent: athidhi-menu-sync" \
  --header "Content-Type: application/json" \
  --data '{"ref":"main","inputs":{"menu_only":"true"}}')

if [ "$status" != 204 ]; then
  echo "GitHub didn't start the menu sync (HTTP $status): $(cat "$dir/last-response")" >&2
  exit 1
fi
echo "$(date -u '+%Y-%m-%d %H:%M UTC'): GitHub started the menu sync"
