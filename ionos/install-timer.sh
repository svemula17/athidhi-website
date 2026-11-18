#!/bin/sh
# Runs on the IONOS webspace over SSH, from the deploy workflow: makes sure the crontab has exactly
# one hourly line for menu-sync.sh. Other crontab lines are left as they are.
set -eu

cd
dir="$(pwd)/athidhi-cron"
if [ ! -f "$dir/menu-sync.sh" ]; then
  echo "$dir/menu-sync.sh is missing; the workflow uploads it before running this." >&2
  exit 1
fi

tag="# athidhi menu sync"
line="17 * * * * /bin/sh $dir/menu-sync.sh > $dir/last-run.log 2>&1 $tag"
{ crontab -l 2>/dev/null | grep -vF "$tag" || true; echo "$line"; } | crontab -

echo "Crontab now:"
crontab -l
