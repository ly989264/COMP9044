#!/bin/sh

# write some regular expressions


# match any number, positive or negative
# 9
# 9.34
# 0.05
# .05
# -0.45
# -.34

# cat numbers.txt | egrep '^\-?([0-9]+(\.[0-9]+)?|\.[0-9]+)$'


# match any number that is not an integer, may be positive or negative

#cat numbers.txt | egrep '^\-?[0-9]*\.[0-9]+$'


# match any number that is an integer, may be positive or negative

#cat numbers.txt | egrep '^\-?[0-9]+$'


# match any lines that do not contain any numbers

#cat lines.txt | egrep -v '[0-9]'


# convert any number in the lines to its nearest integer
# 3.14 -> 3
# -3.14 -> -3
# 4.5 -> 5
# 4 -> 4

cat numbers.txt |
while read line
do
	if (echo "$line" | egrep '^\-?[0-9]+$' >/dev/null)
	then
		echo "$line"
		continue
	fi
	if (echo "$line" | egrep '^\-?[0-9]+\.[56789][0-9]*$' >/dev/null)
	then
		tmp=`echo "$line" | egrep -o '^\-?[0-9]+' | sed -E 's/^\-?//'`
		if (echo "$line" | egrep '^\-' >/dev/null)
		then
			echo "-$(( tmp + 1 ))"
		else
			echo "$(( tmp + 1 ))"
		fi
		continue
	fi
	if (echo "$line" | egrep '^\-?[0-9]+\.[01234][0-9]*$' >/dev/null)
	then
		echo "$line" | sed -E 's/\.[0-9]+$//'
		continue
	fi
	if (echo "$line" | egrep '^\-?\.[01234][0-9]*$' >/dev/null)
	then
		echo "0"
		continue
	fi
	if (echo "$line" | egrep '^\-?\.[56789][0-9]*$' >/dev/null)
	then
		echo "$line" | sed -E 's/\.[0-9]+$/1/'
		continue
	fi
done
