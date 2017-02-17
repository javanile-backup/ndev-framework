#!/bin/bash

ver=$(cat package.json | grep version | tr -d ',":')

git add *

git commit -m "released $ver"

git push

npm publish