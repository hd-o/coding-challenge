#!/usr/bin/env bash

consumer_dir="$PWD/spec/elevator"

if [[ ! -d $consumer_dir ]]; then
  src_dir="$PWD/../elevator-specs/spec/elevator"
  mkdir $consumer_dir
  cp "$src_dir/index.test.tsx" "$consumer_dir/index.test.tsx"
  cp -r "$src_dir/util" "$consumer_dir/util"
fi
