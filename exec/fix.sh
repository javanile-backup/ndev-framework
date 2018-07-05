#!/usr/bin/env bash

##
# $1 - working directory
# $2 - current ndev module

## install into ndev module
cd $1/ndev_modules/$2
eslint --fix src/**