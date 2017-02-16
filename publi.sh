#!/bin/bash

ver=$(cat package.json | grep version)

git add *

git commit -m "$ver"