#!/usr/bin/env bash

##
# $1 - Working directory

## unfreeze ndev modules
cd $1/ndev_modules
for d in * ; do
  mv ../node_modules/.$d ../node_modules/$d
done
