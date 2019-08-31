#!/bin/sh

for file in $@
do
	cnt=0
	while (test -f "$file.$cnt" >/dev/null)
	do
		cnt=$(( cnt + 1 ))
	done
	cp "$file" "$file.$cnt"
	echo "Backup of '$file' saved as '$file.$cnt'"
done
