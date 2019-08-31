#!/bin/sh

if test $# -ne 2
then
	echo "Incorrect parameter format"
	exit 1
fi
cnt=0
while (test $cnt -lt $1)
do
	echo "$2"
	cnt=$(( cnt + 1 ))
done
