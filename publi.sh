#!/bin/bash

ver=$(cat package.json | grep version | tr -d ',":')

git add *

git commit -m "built $ver"

git push

npm publish