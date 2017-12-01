#!/usr/bin/env bash

##
# $1 - Working directory
# $2 - Repository clone url
# $3 - Folder name for the module

##
cd $1

## prepare folder structure
mkdir ndev_modules > /dev/null 2>&1
mkdir node_modules > /dev/null 2>&1
[ -d ndev_modules/$3 ] && rm -fr ndev_modules/$3
[ -d mode_modules/$3 ] && rm -fr node_modules/$3

## clone codebase
cd node_modules
git clone $2 $3

## create symbolic link
cd ..
ln -s ../node_modules/$3 ndev_modules/$3

##
cd ndev_modules/$3
npm install
