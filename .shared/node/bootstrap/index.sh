#!/usr/bin/env bash

cp ../.shared/node/bootstrap/index.html ./index.html

yarn add \
  @babel/preset-env \
  @types/jest \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint \
  eslint-config-standard-with-typescript \
  eslint-plugin-import \
  eslint-plugin-jest \
  eslint-plugin-node \
  eslint-plugin-promise \
  eslint-plugin-unused-imports \
  jest \
  npm-run-all \
  parcel-bundler \
  ts-jest \
  typescript
