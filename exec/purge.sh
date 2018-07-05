#!/usr/bin/env bash

##
cd $1

##
[ -d ndev_modules/$2 ] && rm -fr ndev_modules/$2
[ -d node_modules/$2 ] && rm -fr node_modules/$2
