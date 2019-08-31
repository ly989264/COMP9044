#!/bin/sh
while read lines
do
	echo $lines | tr '0-4' '<' | tr '6-9' '>'
done
