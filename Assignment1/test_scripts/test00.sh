#!/bin/dash


# this test script focuses on the error messages of commands in subset0


# need tmp files named .test00_tmptmp and .test00_tmptmp_2041
# these filenames should not be used by others


# do the cleaning
rm -rf .legit >/dev/null 2>&1
rm .test00_tmptmp >/dev/null 2>&1
rm .test00_tmptmp_2041 >/dev/null 2>&1


# <===Testing for my legit programs===>

echo hi >a
echo hello >b
echo hola >c

# check the subset0 command use before the existence of the repository
legit-add a  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-commit -m "first"  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-log  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-show :a  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-show 0:a  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp

# check the error parameter format of legit-init
legit-init -d --v  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp

# normally create repository
legit-init  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp

# re-create repository
legit-init  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp

# check the subset0 command use when there is no existence of the commit yet
legit-commit -m there-is-no-commit-yet  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-log  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-show :a  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-show 0:a  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp

# add file but not commit, test the subset 0 commands
legit-add a b  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-log  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-show :a  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-show 0:a  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-show :c  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp

# commit the file and test the subset 0 commands
legit-commit -m this-is-the-normal-commit  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-log  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-show :a  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-show 0:a  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-show 1:a  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp
legit-show :c  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp

# re-commit without adding files?
legit-commit -m "recommit without adding files"  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp

# add non-exist file?
legit-add non-exist-file  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp

# show non-exist file>
legit-show :non-exist-file  >>.test00_tmptmp 2>&1
echo $? >>.test00_tmptmp


# <===Running 2041 legit programs===>

rm -rf .legit >/dev/null 2>&1
echo hi >a
echo hello >b
echo hola >c

# check the subset0 command use before the existence of the repository
2041 legit-add a  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-commit -m "first"  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-log  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-show :a  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-show 0:a  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041

# check the error parameter format of legit-init
2041 legit-init -d --v  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041

# normally create repository
2041 legit-init  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041

# re-create repository
2041 legit-init  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041

# check the subset0 command use when there is no existence of the commit yet
2041 legit-commit -m there-is-no-commit-yet  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-log  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-show :a  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-show 0:a  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041

# add file but not commit, test the subset 0 commands
2041 legit-add a b  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-log  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-show :a  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-show 0:a  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-show :c  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041

# commit the file and test the subset 0 commands
2041 legit-commit -m this-is-the-normal-commit  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-log  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-show :a  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-show 0:a  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-show 1:a  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041
2041 legit-show :c  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041

# re-commit without adding files?
2041 legit-commit -m "recommit without adding files"  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041

# add non-exist file?
2041 legit-add non-exist-file  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041

# show non-exist file>
2041 legit-show :non-exist-file  >>.test00_tmptmp_2041 2>&1
echo $? >>.test00_tmptmp_2041


# <===Compare these two files===>

diff ./.test00_tmptmp ./.test00_tmptmp_2041 >/dev/null
if (test $? -eq 0)
then
	echo "Test00 all good"
else
	echo "Something wrong of test00"
fi