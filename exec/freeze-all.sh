#!/usr/bin/env bash

##
# $1 - Working directory

## freeze ndev modules
cd $1/ndev_modules
for d in * ; do
  if [ -d "$d" ]; then
    mv ../node_modules/$d ../node_modules/.$d
  fi
done
