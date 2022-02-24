#!/usr/bin/env bash

project_name=$1

bash ../../.shared/node/bootstrap/project/parcel/index.sh $project_name
bash ../../.shared/node/bootstrap/react/index.sh
