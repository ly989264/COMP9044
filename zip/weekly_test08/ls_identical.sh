#!/bin/sh

dir1="$1"
dir2="$2"
ls "$dir1" |
while read file
do
	real_file="$dir1/$file"
	ls "$dir2" |
	while read f2
	do
		real_f2="$dir2/$f2"
		diff "$real_file" "$real_f2" >/dev/null
		if (test $? -eq 0)
		then
			if (test "$file" = "$f2")
			then
				echo "$file" >>./.tmptmp
			fi
		fi
	done
done
if (test -f "./.tmptmp")
then
	cat "./.tmptmp" | sort | uniq
	rm ./.tmptmp
fi
