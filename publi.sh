#!/bin/bash

ver=$(cat package.json | grep version | tr -d ',":')

git add *

git commit -m "$ver"

git push

npm publish