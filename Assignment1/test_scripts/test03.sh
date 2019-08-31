#!/bin/dash


# this test script focuses on the error messages of commands legit-commit and legit-status in subset1


# need tmp files named .test03_tmptmp and .test03_tmptmp_2041
# these filenames should not be used by others


# do the cleaning
rm -rf .legit >/dev/null 2>&1
rm .test03_tmptmp >/dev/null 2>&1
rm .test03_tmptmp_2041 >/dev/null 2>&1


# <===Run my legit programs===>

echo this is a new file >a
echo this is another new file >b

# testing for the condition of no existing .legit repository
legit-commit -a -m non-exist-commit >>.test03_tmptmp 2>&1
legit-status >>.test03_tmptmp 2>&1

# initialize the repository
legit-init >>.test03_tmptmp 2>&1

# testing legit-status for the condition of no previous commit yet
legit-status >>.test03_tmptmp 2>&1

# add the file
legit-add a b >>.test03_tmptmp 2>&1

# commit the file
legit-commit -a -m first-commit >>.test03_tmptmp 2>&1

# testing legit-commit -a for the condition where no file changes
legit-commit -a -m no-change-commit >>.test03_tmptmp 2>&1

# testing legit-commit -a for the incorrect command format
legit-commit -f -w non-exist-commit >>.test03_tmptmp 2>&1
legit-commit --new file-commit >>.test03_tmptmp 2>&1
legit-commit "only message no flag" >>.test03_tmptmp 2>&1

# testing legit-status for the incorrect command format
legit-status -w >>.test03_tmptmp 2>&1
legit-status --help >>.test03_tmptmp 2>&1
legit-status non-sense-message >>.test03_tmptmp 2>&1


# <===Run 2041 legit programs===>

rm -rf .legit >/dev/null 2>&1
echo this is a new file >a
echo this is another new file >b

# testing for the condition of no existing .legit repository
2041 legit-commit -a -m non-exist-commit >>.test03_tmptmp_2041 2>&1
2041 legit-status >>.test03_tmptmp_2041 2>&1

# initialize the repository
2041 legit-init >>.test03_tmptmp_2041 2>&1

# testing legit-status for the condition of no previous commit yet
2041 legit-status >>.test03_tmptmp_2041 2>&1

# add the file
2041 legit-add a b >>.test03_tmptmp_2041 2>&1

# commit the file
2041 legit-commit -a -m first-commit >>.test03_tmptmp_2041 2>&1

# testing legit-commit -a for the condition where no file changes
2041 legit-commit -a -m no-change-commit >>.test03_tmptmp_2041 2>&1

# testing legit-commit -a for the incorrect command format
2041 legit-commit -f -w non-exist-commit >>.test03_tmptmp_2041 2>&1
2041 legit-commit --new file-commit >>.test03_tmptmp_2041 2>&1
2041 legit-commit "only message no flag" >>.test03_tmptmp_2041 2>&1

# testing legit-status for the incorrect command format
2041 legit-status -w >>.test03_tmptmp_2041 2>&1
2041 legit-status --help >>.test03_tmptmp_2041 2>&1
2041 legit-status non-sense-message >>.test03_tmptmp_2041 2>&1


# <===Compare these two files===>

diff ./.test03_tmptmp ./.test03_tmptmp_2041 >/dev/null
if (test $? -eq 0)
then
	echo "Test03 all good"
else
	echo "Something wrong with test03"
fi