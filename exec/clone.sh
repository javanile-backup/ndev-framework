#!/usr/bin/env bash

##
# $1 - Working directory
# $2 - Repository clone url
# $3 - Folder name for the module into node_modules
# $4 - Folder name for the module into ndev_modules

## goto working directory
cd $1

## prepare folder structure
mkdir ndev_modules > /dev/null 2>&1
mkdir node_modules > /dev/null 2>&1
[ -d node_modules/$3 ] && rm -fr node_modules/$3
[ -d ndev_modules/$4 ] && rm -fr ndev_modules/$4

## clone codebase
cd node_modules && git clone $2 $3

## create symbolic link
cd .. && ln -s ../node_modules/$3 ndev_modules/$4

## install dependencies
[ -f ndev_modules/$4/package.json ] && cd ndev_modules/$4 && npm install
