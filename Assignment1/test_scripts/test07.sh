#!/bin/dash


# this test script focuses on the uses of command legit-branch and legit-checkout of subset2


# need tmp files named .test07_tmptmp and .test07_tmptmp_2041
# these filenames should not be used by others


# do the cleaning
rm -rf .legit >/dev/null 2>&1
rm .test07_tmptmp >/dev/null 2>&1
rm .test07_tmptmp_2041 >/dev/null 2>&1


# <===Run my legit programs===>

echo hola >a
echo this is the first line >b
echo this is the cat list >c
echo this is the dog list >d

legit-init >>.test07_tmptmp 2>&1
legit-add a b c d >>.test07_tmptmp 2>&1
legit-commit -m "init commit" >>.test07_tmptmp 2>&1
legit-branch b1 >>.test07_tmptmp 2>&1
legit-branch b2 >>.test07_tmptmp 2>&1
legit-checkout b1 >>.test07_tmptmp 2>&1
echo persian >>c
echo siamese >>c
legit-commit -a -m "add two lovely cats from b1" >>.test07_tmptmp 2>&1
legit-branch b1a >>.test07_tmptmp 2>&1
legit-checkout b2 >>.test07_tmptmp 2>&1
echo golden retriver >>d
echo german shepherd >>d
legit-checkout b1 >>.test07_tmptmp 2>&1
legit-commit -a -m "add two doggies from b2" >>.test07_tmptmp 2>&1
legit-checkout master >>.test07_tmptmp 2>&1
echo good day >>a
legit-status >>.test07_tmptmp 2>&1
legit-log >>.test07_tmptmp 2>&1
cat a b c d >>.test07_tmptmp 2>&1
legit-commit -a -m add-from-master >>.test07_tmptmp 2>&1
legit-checkout b1 >>.test07_tmptmp 2>&1
legit-status >>.test07_tmptmp 2>&1
legit-log >>.test07_tmptmp 2>&1
legit-checkout b2 >>.test07_tmptmp 2>&1
legit-status >>.test07_tmptmp 2>&1
legit-log >>.test07_tmptmp 2>&1
legit-checkout b1a >>.test07_tmptmp 2>&1
legit-status >>.test07_tmptmp 2>&1
legit-log >>.test07_tmptmp 2>&1
rm c d
legit-commit -a -m "oh this guy removes all lovely cats and dogs" >>.test07_tmptmp 2>&1
legit-checkout master >>.test07_tmptmp 2>&1
legit-status >>.test07_tmptmp 2>&1
cat c d >>.test07_tmptmp 2>&1

# try delete?
legit-branch -d b1 >>.test07_tmptmp 2>&1
legit-branch -d b1a >>.test07_tmptmp 2>&1
legit-checkout b2 >>.test07_tmptmp 2>&1
legit-branch b2a >>.test07_tmptmp 2>&1
legit-branch -d b2a >>.test07_tmptmp 2>&1



# <===Run 2041 legit programs===>

rm -rf .legit >/dev/null 2>&1
echo hola >a
echo this is the first line >b
echo this is the cat list >c
echo this is the dog list >d

2041 legit-init >>.test07_tmptmp_2041 2>&1
2041 legit-add a b c d >>.test07_tmptmp_2041 2>&1
2041 legit-commit -m "init commit" >>.test07_tmptmp_2041 2>&1
2041 legit-branch b1 >>.test07_tmptmp_2041 2>&1
2041 legit-branch b2 >>.test07_tmptmp_2041 2>&1
2041 legit-checkout b1 >>.test07_tmptmp_2041 2>&1
echo persian >>c
echo siamese >>c
2041 legit-commit -a -m "add two lovely cats from b1" >>.test07_tmptmp_2041 2>&1
2041 legit-branch b1a >>.test07_tmptmp_2041 2>&1
2041 legit-checkout b2 >>.test07_tmptmp_2041 2>&1
echo golden retriver >>d
echo german shepherd >>d
2041 legit-checkout b1 >>.test07_tmptmp_2041 2>&1
2041 legit-commit -a -m "add two doggies from b2" >>.test07_tmptmp_2041 2>&1
2041 legit-checkout master >>.test07_tmptmp_2041 2>&1
echo good day >>a
2041 legit-status >>.test07_tmptmp_2041 2>&1
2041 legit-log >>.test07_tmptmp_2041 2>&1
cat a b c d >>.test07_tmptmp_2041 2>&1
2041 legit-commit -a -m add-from-master >>.test07_tmptmp_2041 2>&1
2041 legit-checkout b1 >>.test07_tmptmp_2041 2>&1
2041 legit-status >>.test07_tmptmp_2041 2>&1
2041 legit-log >>.test07_tmptmp_2041 2>&1
2041 legit-checkout b2 >>.test07_tmptmp_2041 2>&1
2041 legit-status >>.test07_tmptmp_2041 2>&1
2041 legit-log >>.test07_tmptmp_2041 2>&1
2041 legit-checkout b1a >>.test07_tmptmp_2041 2>&1
2041 legit-status >>.test07_tmptmp_2041 2>&1
2041 legit-log >>.test07_tmptmp_2041 2>&1
rm c d
2041 legit-commit -a -m "oh this guy removes all lovely cats and dogs" >>.test07_tmptmp_2041 2>&1
2041 legit-checkout master >>.test07_tmptmp_2041 2>&1
2041 legit-status >>.test07_tmptmp_2041 2>&1
cat c d >>.test07_tmptmp_2041 2>&1

# try delete?
2041 legit-branch -d b1 >>.test07_tmptmp_2041 2>&1
2041 legit-branch -d b1a >>.test07_tmptmp_2041 2>&1
2041 legit-checkout b2 >>.test07_tmptmp_2041 2>&1
2041 legit-branch b2a >>.test07_tmptmp_2041 2>&1
2041 legit-branch -d b2a >>.test07_tmptmp_2041 2>&1


# <===Compare these two files===>

diff ./.test07_tmptmp ./.test07_tmptmp_2041 >/dev/null
if (test $? -eq 0)
then
	echo "Test07 all good"
else
	echo "Something wrong with test07"
fi