#!/bin/sh

cat "$1" | egrep 'price' | sed -E 's/^.*?name"://' | sed -E 's/price.*?$//' | tr -d '",${}' | sed -E 's/^ *//' | sed -E 's/ *$//' | sort | uniq
