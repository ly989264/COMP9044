#!/bin/sh

for file in *
do
	suffix=`echo "$file" | egrep -o '\.html?$'`
	if test "$suffix" = ".htm"
	then
		result_filename="$file""l"
		if test -f "$result_filename"
		then
			echo "$result_filename exists"
			exit 1
		else
			cp "$file" "$result_filename"
			rm "$file"
		fi
	fi
done
