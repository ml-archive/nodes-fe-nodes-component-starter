#!/bin/bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! No deploy!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)

cd release

git init
git config user.name "Dennis Haulund Nielsen"
git config user.email "dhni@nodes.dk"

git remote add upstream "https://$GH_TOKEN@github.com/nodes-frontend/nodes-component-starter.git"
git fetch upstream
git reset upstream/gh-pages

touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git push upstream HEAD:gh-pages