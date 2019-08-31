#!/bin/dash


# this test script focuses on the error messages of command legit-branch and legit-checkout of subset2


# need tmp files named .test06_tmptmp and .test06_tmptmp_2041
# these filenames should not be used by others


# do the cleaning
rm -rf .legit >/dev/null 2>&1
rm .test06_tmptmp >/dev/null 2>&1
rm .test06_tmptmp_2041 >/dev/null 2>&1


# <===Run my legit programs===>

echo this is the first line >a
echo this is the 1st line >b

# check for the condition of non-existing .legit repository
# should raise error
legit-branch >>.test06_tmptmp 2>&1
legit-branch non-existing-branch >>.test06_tmptmp 2>&1
legit-branch -d non-existing-branch >>.test06_tmptmp 2>&1
legit-checkout non-existing-branch >>.test06_tmptmp 2>&1

# initialize the repository
legit-init >>.test06_tmptmp 2>&1

# check for the condition where there is no commit in the repository yet
# should raise error
legit-branch >>.test06_tmptmp 2>&1
legit-branch non-existing-branch >>.test06_tmptmp 2>&1
legit-branch -d non-existing-branch >>.test06_tmptmp 2>&1
legit-checkout non-existing-branch >>.test06_tmptmp 2>&1

# check for the condition where there is no commit in the repository yet, but files in the index
# should raise error
legit-add a b >>.test06_tmptmp 2>&1
legit-branch >>.test06_tmptmp 2>&1
legit-branch non-existing-branch >>.test06_tmptmp 2>&1
legit-branch -d non-existing-branch >>.test06_tmptmp 2>&1
legit-checkout non-existing-branch >>.test06_tmptmp 2>&1

# commit
legit-commit -m first-commit-add-a-and-b >>.test06_tmptmp 2>&1

# check for the wrong command format of legit-branch
legit-branch -v >>.test06_tmptmp 2>&1
legit-branch --help >>.test06_tmptmp 2>&1
legit-branch branch-1 branch-2 >>.test06_tmptmp 2>&1
legit-branch -d non-existing-branch >>.test06_tmptmp 2>&1

# add new branches
legit-branch b1 >>.test06_tmptmp 2>&1
legit-branch b2 >>.test06_tmptmp 2>&1
legit-branch >>.test06_tmptmp 2>&1

# check for the wrong command format of legit-checkout
legit-checkout -v --help b1 >>.test06_tmptmp 2>&1
legit-checkout b1 b2 >>.test06_tmptmp 2>&1
legit-checkout non-existing-branch >>.test06_tmptmp 2>&1

# check for the condition where checkout may violate the file
legit-checkout b1 >>.test06_tmptmp 2>&1
echo this is the new line >>a
legit-add a >>.test06_tmptmp 2>&1
legit-checkout master >>.test06_tmptmp 2>&1


# <===Run 2041 legit programs===>

rm -rf .legit >/dev/null 2>&1
echo this is the first line >a
echo this is the 1st line >b

# check for the condition of non-existing .legit repository
# should raise error
2041 legit-branch >>.test06_tmptmp_2041 2>&1
2041 legit-branch non-existing-branch >>.test06_tmptmp_2041 2>&1
2041 legit-branch -d non-existing-branch >>.test06_tmptmp_2041 2>&1
2041 legit-checkout non-existing-branch >>.test06_tmptmp_2041 2>&1

# initialize the repository
2041 legit-init >>.test06_tmptmp_2041 2>&1

# check for the condition where there is no commit in the repository yet
# should raise error
2041 legit-branch >>.test06_tmptmp_2041 2>&1
2041 legit-branch non-existing-branch >>.test06_tmptmp_2041 2>&1
2041 legit-branch -d non-existing-branch >>.test06_tmptmp_2041 2>&1
2041 legit-checkout non-existing-branch >>.test06_tmptmp_2041 2>&1

# check for the condition where there is no commit in the repository yet, but files in the index
# should raise error
2041 legit-add a b >>.test06_tmptmp_2041 2>&1
2041 legit-branch >>.test06_tmptmp_2041 2>&1
2041 legit-branch non-existing-branch >>.test06_tmptmp_2041 2>&1
2041 legit-branch -d non-existing-branch >>.test06_tmptmp_2041 2>&1
2041 legit-checkout non-existing-branch >>.test06_tmptmp_2041 2>&1

# commit
2041 legit-commit -m first-commit-add-a-and-b >>.test06_tmptmp_2041 2>&1

# check for the wrong command format of legit-branch
2041 legit-branch -v >>.test06_tmptmp_2041 2>&1
2041 legit-branch --help >>.test06_tmptmp_2041 2>&1
2041 legit-branch branch-1 branch-2 >>.test06_tmptmp_2041 2>&1
2041 legit-branch -d non-existing-branch >>.test06_tmptmp_2041 2>&1

# add new branches
2041 legit-branch b1 >>.test06_tmptmp_2041 2>&1
2041 legit-branch b2 >>.test06_tmptmp_2041 2>&1
2041 legit-branch >>.test06_tmptmp_2041 2>&1

# check for the wrong command format of legit-checkout
2041 legit-checkout -v --help b1 >>.test06_tmptmp_2041 2>&1
2041 legit-checkout b1 b2 >>.test06_tmptmp_2041 2>&1
2041 legit-checkout non-existing-branch >>.test06_tmptmp_2041 2>&1

# check for the condition where checkout may violate the file
2041 legit-checkout b1 >>.test06_tmptmp_2041 2>&1
echo this is the new line >>a
2041 legit-add a >>.test06_tmptmp_2041 2>&1
2041 legit-checkout master >>.test06_tmptmp_2041 2>&1


# <===Compare these two files===>

diff ./.test06_tmptmp ./.test06_tmptmp_2041 >/dev/null
if (test $? -eq 0)
then
	echo "Test06 all good"
else
	echo "Something wrong with test06"
fi