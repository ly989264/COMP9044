#!/bin/sh

url1="http://legacy.handbook.unsw.edu.au/vbook2018/brCoursesByAtoZ.jsp?StudyLevel=Undergraduate&descr="
url2="http://legacy.handbook.unsw.edu.au/vbook2018/brCoursesByAtoZ.jsp?StudyLevel=Postgraduate&descr="

if test $# -eq 0
then
	# no argument, parse all courses?
	echo "No argument, parse all courses?"
elif test $# -eq 1
then
	# only one argument, then parse the courses starting with that argument
	beginLetter=`echo "$1" | cut -c1`
	url1="$url1$beginLetter"
	url2="$url2$beginLetter"
	curl --silent "$url1" "$url2" | grep "$1" | egrep -v 'left">' | egrep '^.*?2018/([A-Z]{4}[0-9]{4})\.html">(.*?)<.*$' | perl -p -e '$_=~s/^.*?2018\/([A-Z]{4}[0-9]{4})\.html">(.*?)<.*$/\1 \2/;print' | sort | uniq

else
	# too many arguments
	echo "Too many arguments"
fi

# by z5190675
