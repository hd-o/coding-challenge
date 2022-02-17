#!/usr/bin/env bash

mkdir -p ./.config

cp ../.shared/node/bootstrap/react/config/eslint.js.txt ./.config/eslint.js

yarn add \
  @testing-library/jest-dom \
  @testing-library/react \
  @types/react \
  @types/react-dom \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  react \
  react-dom
