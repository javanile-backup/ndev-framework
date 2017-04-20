#!/usr/bin/env bash

##
# $1 -
# $2 -
# ${@:3} - rest of the arguments

##
cd $1/ndev_modules/$2
npm install --save-dev ${@:3}
rm -fr node_modules

## freeze all ndev modules
cd $1/ndev_modules
for d in * ; do
  if [ -d "$d" ]; then
    mv ../node_modules/$d ../node_modules/.$d
  fi
done

## install on root project
cd $1
npm install ${@:3}

## unfreeze all ndev modules
cd $1/ndev_modules
for d in * ; do
  if [ -d ".$d" ]; then
    mv ../node_modules/.$d ../node_modules/$d
  fi
done


