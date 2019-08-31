#!/bin/sh
# ungif - convert gifs to PNG format

for f in "$@"
do
    dir=`dirname "$f"`
    prefix=`basename "$f" .gif`
    outfile="$dir/$prefix.png"
    giftopnm "$f" | pnmtopng > "$outfile"
    echo "$dir"
    echo "$prefix"
    echo "$outfile"
done
