#!/usr/bin/env bash

##
# $1 - working directory
# $2 - ndev module folder

cd $1/ndev_modules/$2
ver=$(cat package.json | grep version | tr -d ',":')
git add .
git add *
git config push.default simple
git commit -m "$ver"
git pull
git push
