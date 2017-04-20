#!/usr/bin/env bash

##
# $1 -
# $2 -

##
cd $1
mv ./node_modules/$2 ./node_modules/.$2
rm -fr ndev_modules/$2 > /dev/null 2>&1
