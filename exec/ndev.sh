#!/usr/bin/env bash

cd ..
mkdir ndev_modules > /dev/null 2>&1
mkdir node_modules > /dev/null 2>&1
rm -fr ndev_modules/$2
rm -fr node_modules/$2
cd node_modules
git clone $1 $2
cd ..
ln -s ../node_modules/$2 ndev_modules/$2



