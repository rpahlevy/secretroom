#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install --trace
bundle exec rails assets:precompile --trace
bundle exec rails assets:clean --trace
bundle exec rails credentials:edit --trace