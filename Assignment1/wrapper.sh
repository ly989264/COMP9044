#!/bin/sh

cat test_merge_files |
while read line
do
	echo "$line" | cut -d'|' -f1 | sed 's/^ //;s/ $//' | tr ' ' '\n' >.tmp1
	echo "$line" | cut -d'|' -f2 | sed 's/^ //;s/ $//' | tr ' ' '\n' >.tmp2
	echo "$line" | cut -d'|' -f3 | sed 's/^ //;s/ $//' | tr ' ' '\n' >.tmp3
	./triple_compare.pl .tmp1 .tmp2 .tmp3
	echo "****************"
done
