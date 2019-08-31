#!/bin/sh

for file in "$@"
do
	egrep '^#include ".*?"' "$file" | egrep -o '".*?"' | sed 's/"//g'|
	while read line
	do
		if ! test -f "$line"
		then
			echo "$line included into $file does not exist"
		fi
	done
done
