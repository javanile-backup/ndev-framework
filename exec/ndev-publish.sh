#!/usr/bin/env bash

##
cd $1/ndev_modules/$2
ver=$(cat package.json | grep version | tr -d ',":')
git add *
git config push.default simple
git commit -m "$ver"
git push
npm publish
