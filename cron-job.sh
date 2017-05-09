#!/bin/bash
if [ "$KEY_REPO" == "" ]; then
	echo "must set KEY_REPO enviroment variable"
	exit 1
fi

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do
	DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
	SOURCE="$( readlink "$SOURCE" )"
	[[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
PROCESS_SCRIPT="$( cd -P "$( dirname "$SOURCE" )" && pwd )/src/index.js"

cd $KEY_REPO
git pull

KEY_OUTPUT=$KEY_REPO"npm-all" node $PROCESS_SCRIPT

CHANGED=$(git status --porcelain)
wc -l $KEY_REPO"npm-all" | grep "^0 "
if [ -n "${CHANGED}" -a $? != 0 ]; then
	git add .
	git commit -m "$(date)"
	git push
fi
