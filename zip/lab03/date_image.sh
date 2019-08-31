#!/bin/sh

for file in "$@"
do
	convert -gravity center -pointsize 36 -draw "text 0,10 '`ls -l $file | cut -d\  -f6,7,8`'" "$file" "$file"
done
