#!/usr/bin/env bash

##
cd $1/ndev_modules/$2
mocha --reporter spec test/test.js | sed '/^\s*$/d'
