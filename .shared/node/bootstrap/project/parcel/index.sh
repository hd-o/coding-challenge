#!/usr/bin/env bash

project_name=$1

bash ../../.shared/node/bootstrap/project/index.sh $project_name
bash ../../.shared/node/bootstrap/parcel/index.sh
