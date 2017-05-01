#!/usr/bin/env bash

##
cd $1/ndev_modules
for d in * ; do
  if [ -d "$d" ]; then
    mv ../node_modules/$d ../node_modules/.$d
  fi
done

##
cd $1
npm install ${@:2}

##
cd $1/ndev_modules
for d in * ; do
  mv ../node_modules/.$d ../node_modules/$d
done