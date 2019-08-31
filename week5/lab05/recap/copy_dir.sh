#!/bin/sh

# copy a directory

directory="$1"
mkdir "$directory.0"
for file in ./$directory/*
do
	filename=`echo "$file" | sed -E 's/^.*\///'`
	cp "$file" "$directory.0/$filename"
done
