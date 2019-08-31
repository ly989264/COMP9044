#!/bin/sh

start="$1"
end="$2"
targetfile="$3"

while (test "$start" -le "$end")
do
	echo "$start" >>"$targetfile"
	start=$(( $start + 1))
done
