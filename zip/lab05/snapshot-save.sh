#!/bin/dash

# first find the target directory name

cnt=0
while (test 1) 
do
	target_dirname=".snapshot.$cnt"
	if (test -d "$target_dirname")
	then
		cnt=$(($cnt + 1))
	else
		break
	fi
done

mkdir "$target_dirname"

for each_file in *
do
	# ignore the files starting with dot, snapshot-save.sh, and snapshot-load.sh
	if (! test `egrep "^\." "$each_file"` && test "$each_file" != "snapshot-save.sh" && test "$each_file" != "snapshot-load.sh")
	then
		cp "$each_file" "./$target_dirname/$each_file"
	fi
done

echo "Creating snapshot $cnt"
	
