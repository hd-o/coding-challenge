#!/usr/bin/env bash

# example:
# bash ./index.sh package-name

package_name=$1

json=$(cat ../.shared/node/bootstrap/package/package.json)
json=$(echo "${json/package-name/$package_name}")

echo "$json" > ./package.json

yarn
