#!/usr/bin/env bash

##
# $1 - Working directory
# ${@:2} - Payload arguments for install

## freeze ndev modules
cd $1/ndev_modules
for d in * ; do
  if [ -d "$d" ]; then
    mv ../node_modules/$d ../node_modules/.$d
  fi
done

## perform install
cd $1
npm install ${@:2}

## unfreeze ndev modules
cd $1/ndev_modules
for d in * ; do
  mv ../node_modules/.$d ../node_modules/$d
done