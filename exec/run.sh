#!/usr/bin/env bash

##
cd $1/ndev_modules/$2
npm run -s ${@:3}
