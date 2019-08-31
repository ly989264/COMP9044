#!/bin/sh

for file in "$@"
do
	display "$file"
	echo "Address to e-mail this image to? "
	read address
	echo "Message to accompany image? "
	read message
	echo "$message" | mutt -s "$file" -e 'set copy=no' -a "$file" -- "$address"
	echo "$file sent to $address"
done
