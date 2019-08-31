#!/bin/sh

for file in *
do
	if echo "$file" | egrep '\.jpg$' >/dev/null
	then
		newfile=`echo "$file" | sed 's/\.jpg/\.png/'`
		if [ -e "$newfile" ]
		then
			echo "$newfile already exists"
			exit 1
		fi
		convert "$file" "$newfile"
		if test $?
		then
			rm "$file"
		fi
	fi
done
