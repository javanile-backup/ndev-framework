#!/usr/bin/env bash

##
# $1 - working directory
# $2 - current ndev module
# $3 - file to test

##
cd $1/ndev_modules/$2
mocha --reporter spec $3 | sed '/^\s*$/d'
