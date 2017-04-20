#!/usr/bin/env bash

##
cd $1
mkdir ndev_modules > /dev/null 2>&1
rm -fr ndev_modules/$2 > /dev/null 2>&1
mv ./node_modules/.$2 ./node_modules/$2
ln -s ../node_modules/$2 ndev_modules/$2
