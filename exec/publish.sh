#!/usr/bin/env bash

##
cd $1/ndev_modules/$2

##
ver=$(cat package.json | grep version | tr -d ',":')

##
git config credential.helper 'cache --timeout=3600'
git add .
git add *
git config push.default simple
git commit -m "$ver"
git pull
git push
npm publish
