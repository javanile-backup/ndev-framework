#!/usr/bin/env bash

##
# $1 - Working directory
# $2 - Curent ndev module

##
cd $1/ndev_modules/$2

##
git config credential.helper 'cache --timeout=3600'
git pull

##
npm install
