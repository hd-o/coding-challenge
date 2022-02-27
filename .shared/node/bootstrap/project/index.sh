#!/usr/bin/env bash

project_name=$1

bash ../../.shared/node/bootstrap/package/index.sh $project_name
bash ../../.shared/node/bootstrap/index.sh
