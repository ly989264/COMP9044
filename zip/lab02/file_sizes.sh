#!/bin/sh

small="Small files:"
medium="Medium-sized files:"
large="Large files:"
for file in *
do
	cnt=`wc -l "$file" | cut -d' ' -f1`
	if test $cnt -lt 10
	then
		small="$small $file"
	elif test $cnt -lt 100
	then
		medium="$medium $file"
	else
		large="$large $file"
	fi
done
echo "$small"
echo "$medium"
echo "$large"
