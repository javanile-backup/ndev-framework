#!/usr/bin/env bash

##
# $1 - Working directory
# $2 - Module name

cd $1/ndev_modules/$2
npm run test
