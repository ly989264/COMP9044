#!/bin/sh

cat test_merge_files_v2 |
while read line
do
	echo "$line" | cut -d'|' -f1 | sed 's/^ //;s/ $//' | tr ' ' '\n' >.tmp1
	echo "$line" | cut -d'|' -f2 | sed 's/^ //;s/ $//' | tr ' ' '\n' >.tmp2
	echo "$line" | cut -d'|' -f3 | sed 's/^ //;s/ $//' | tr ' ' '\n' >.tmp3
	if (test -d .legit)
	then
		rm -rf .legit
	fi
	legit-init >/dev/null
	cat .tmp1 >a
	legit-add a >/dev/null
	legit-commit -m init >/dev/null
	legit-branch b1 >/dev/null
	legit-checkout b1 >/dev/null
	cat .tmp2 >a
	legit-commit -a -m from-b1 >/dev/null
	legit-checkout master >/dev/null
	cat .tmp3 >a
	legit-commit -a -m from-master >/dev/null
	legit-merge b1 -m try-merge >/dev/null
	cat a | tr '\n' ' ' >>res
	echo "" >>res
	echo "****************" >>res
done
