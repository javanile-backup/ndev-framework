#!/usr/bin/env bash

##
# $1 - working directory
# $2 - current ndev module
# ${@:3} - rest of the arguments

## install into ndev module
cd $1/ndev_modules/$2
npm install --save ${@:3}

## install on root project
cd $1
if [ -f "package.json" ]; then
  ## freeze all ndev modules
  cd $1/ndev_modules
  for d in * ; do
    if [ -d "$d" ]; then
      mv ../node_modules/$d ../node_modules/.$d
    fi
  done

  ## avoid annoying reinstall
  npm install ${@:3}

  ## unfreeze all ndev modules
  cd $1/ndev_modules
  for d in * ; do
    mv ../node_modules/.$d ../node_modules/$d
  done
fi
