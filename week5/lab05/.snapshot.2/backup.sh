#!/bin/sh

for source_filename in $@
do
	cnt=0
	while (test 1)
	do
		target_filename=".$source_filename.$cnt"
		if (test -f "$target_filename")
		then
			cnt=$(( $cnt + 1 ))
		else
			cp "$source_filename" "$target_filename"
			echo "Backup of '$source_filename' saved as '$target_filename'"
			break
		fi
	done
done
