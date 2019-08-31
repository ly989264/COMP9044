#!/bin/sh
echo "$1" | egrep '^[0-9]+$' >/dev/null
check=$?
if test "$#" -ne 2
then
	echo "Usage: ./echon.sh <number of lines> <string>"
elif test "$check" -eq 0
then
	cnt=0
	while test "$cnt" -lt "$1"
	do
		echo "$2"
		cnt=$(($cnt+1))
	done
else
	echo "./echon.sh: argument 1 must be a non-negative integer"
fi
