#!/bin/bash
set -x

REPO_NAME=npm-package-names
if [ -d "../$REPO_NAME" ]; then
	cd /tmp/$REPO_NAME
	git pull
else
	cd /tmp
	git clone https://github.com/Jephuff/$REPO_NAME.git
fi
cd -

KEY_OUTPUT=/tmp/$REPO_NAME/npm-all node src

cd /tmp/$REPO_NAME

CHANGED=$(git status --porcelain)

wc -l npm-all | grep "^0 "

if [ -n "$CHANGED" -a $? != 0 ]; then
	echo "commit"
	git add .
	git config user.email "jeffrey.m.burt@gmail.com"
	git config user.name "Jeffrey Burt"
	git commit -m "$(date)"
	git push
else
	echo no changes
fi
