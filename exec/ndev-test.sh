#!/usr/bin/env bash

##
cd $1/ndev_modules/$2
mocha --reporter min test/test.js
