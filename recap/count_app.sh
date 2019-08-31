#!/bin/sh

line="hola hola hola"
cnt=0
while (echo "$line" | egrep 'hola' >/dev/null)
do
	line=`echo "$line" | sed -E 's/hola//'`
	cnt=$(( cnt + 1 ))
done
echo "$cnt"
