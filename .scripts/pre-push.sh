#!/bin/sh
set -e

# This script asserts commited code trying to be pushed has
# no differences from prettier-ed version.

# Restore the working directory if previously stashed
function restore_stash {
  if [ $(git stash list | wc -l) -gt $stash_size ]
  then
    git stash pop > /dev/null 2>&1
  fi
}

trap restore_stash EXIT

# Temporarily clear the working directory
stash_size=$(git stash list | wc -l)
git stash -u > /dev/null
git status


# Run prettier in `-l` mode
echo "Checking formatting"
git status
npm run prettier-test
