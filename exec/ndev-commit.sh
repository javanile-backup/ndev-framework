#!/usr/bin/env bash

##
# $1 - Working directory
# $2 - Curent ndev module
# $3 - Commit message

##
cd $1/ndev_modules/$2

##
git config credential.helper 'cache --timeout=3600'
git pull
git add .
git add *
git config push.default simple
git commit -m "$3"
git pull
git push
