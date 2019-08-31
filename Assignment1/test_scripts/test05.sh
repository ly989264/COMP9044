#!/bin/dash


# this test script focuses on some complicated situation of commands in subset1


# need tmp files named .test05_tmptmp and .test05_tmptmp_2041
# these filenames should not be used by others

# do the cleaning
rm -rf .legit >/dev/null 2>&1
rm .test05_tmptmp >/dev/null 2>&1
rm .test05_tmptmp_2041 >/dev/null 2>&1
rm v w >/dev/null 2>&1


# <===Run my legit programs===>

echo this is the first line >a
echo hi >b
echo line 1 >c

# initialize the repository
legit-init >>.test05_tmptmp 2>&1

# add files, but not commit
legit-add a b c >>.test05_tmptmp 2>&1

# testing commands in the condition of no existing commits but existence of index files
# should all raise errors
legit-rm a >>.test05_tmptmp 2>&1
legit-rm --force b >>.test05_tmptmp 2>&1
legit-rm --cached c >>.test05_tmptmp 2>&1
legit-status >>.test05_tmptmp 2>&1

# commit these files, should not raise error
legit-commit -a -m "commit-commit" >>.test05_tmptmp 2>&1

# testing wrong format of legit-status
legit-status >>.test05_tmptmp 2>&1
legit-status -m >>.test05_tmptmp 2>&1

# delete these files using different modes
legit-rm a >>.test05_tmptmp 2>&1
legit-rm --force b >>.test05_tmptmp 2>&1
legit-rm --cached c >>.test05_tmptmp 2>&1
cat a b c >>.test05_tmptmp 2>&1
legit-status >>.test05_tmptmp 2>&1
legit-show :a >>.test05_tmptmp 2>&1
legit-show :b >>.test05_tmptmp 2>&1
legit-show :c >>.test05_tmptmp 2>&1
legit-show 0:a >>.test05_tmptmp 2>&1
legit-show 0:b >>.test05_tmptmp 2>&1
legit-show 0:c >>.test05_tmptmp 2>&1
legit-commit -m "delete files" >>.test05_tmptmp 2>&1

# testing rm command in the condition of file added but not committed
echo this is the first line v2 >a
echo hello v2 >b
echo line 1 v2 >c
legit-add a b c >>.test05_tmptmp 2>&1
legit-rm a >>.test05_tmptmp 2>&1
legit-rm --force b >>.test05_tmptmp 2>&1
legit-rm --cached c >>.test05_tmptmp 2>&1
legit-status >>.test05_tmptmp 2>&1
legit-show :a >>.test05_tmptmp 2>&1
legit-show :b >>.test05_tmptmp 2>&1
legit-show :c >>.test05_tmptmp 2>&1
legit-show 1:a >>.test05_tmptmp 2>&1
legit-show 1:b >>.test05_tmptmp 2>&1
legit-show 1:c >>.test05_tmptmp 2>&1

# commit
legit-commit -m "try rm without commit" >>.test05_tmptmp 2>&1
legit-status >>.test05_tmptmp 2>&1
legit-show 2:a >>.test05_tmptmp 2>&1
legit-show 2:b >>.test05_tmptmp 2>&1
legit-show 2:c >>.test05_tmptmp 2>&1

# try commit -a mode
echo this should no be added >a
echo this should not be added as well >b
echo this should not be added either >c
legit-commit -a -m "try -a mode" >>.test05_tmptmp 2>&1
legit-status >>.test05_tmptmp 2>&1
legit-add a b >>.test05_tmptmp 2>&1
echo add one line >>a
echo add another line >>b
echo try this line >>c
legit-commit -a -m "add a and b" >>.test05_tmptmp 2>&1
legit-status >>.test05_tmptmp 2>&1

# what if there are irrelevant files in the directory?
echo this is irrelevant file >v
echo this is irrelevant file as well >w
legit-commit -a -m "should not add anything" >>.test05_tmptmp 2>&1
legit-status >>.test05_tmptmp 2>&1


# try wrong legit-rm format
legit-rm -v -f a >>.test05_tmptmp 2>&1
legit-rm -force b >>.test05_tmptmp 2>&1


# <===Run 2041 legit programs===>

rm -rf .legit >/dev/null 2>&1
rm v w >/dev/null 2>&1
echo this is the first line >a
echo hi >b
echo line 1 >c

# initialize the repository
2041 legit-init >>.test05_tmptmp_2041 2>&1

# add files, but not commit
2041 legit-add a b c >>.test05_tmptmp_2041 2>&1

# testing commands in the condition of no existing commits but existence of index files
# should all raise errors
2041 legit-rm a >>.test05_tmptmp_2041 2>&1
2041 legit-rm --force b >>.test05_tmptmp_2041 2>&1
2041 legit-rm --cached c >>.test05_tmptmp_2041 2>&1
2041 legit-status >>.test05_tmptmp_2041 2>&1

# commit these files, should not raise error
2041 legit-commit -a -m "commit-commit" >>.test05_tmptmp_2041 2>&1

# testing wrong format of legit-status
2041 legit-status >>.test05_tmptmp_2041 2>&1
2041 legit-status -m >>.test05_tmptmp_2041 2>&1

# delete these files using different modes
2041 legit-rm a >>.test05_tmptmp_2041 2>&1
2041 legit-rm --force b >>.test05_tmptmp_2041 2>&1
2041 legit-rm --cached c >>.test05_tmptmp_2041 2>&1
cat a b c >>.test05_tmptmp_2041 2>&1
2041 legit-status >>.test05_tmptmp_2041 2>&1
2041 legit-show :a >>.test05_tmptmp_2041 2>&1
2041 legit-show :b >>.test05_tmptmp_2041 2>&1
2041 legit-show :c >>.test05_tmptmp_2041 2>&1
2041 legit-show 0:a >>.test05_tmptmp_2041 2>&1
2041 legit-show 0:b >>.test05_tmptmp_2041 2>&1
2041 legit-show 0:c >>.test05_tmptmp_2041 2>&1
2041 legit-commit -m "delete files" >>.test05_tmptmp_2041 2>&1

# testing rm command in the condition of file added but not committed
echo this is the first line v2 >a
echo hello v2 >b
echo line 1 v2 >c
2041 legit-add a b c >>.test05_tmptmp_2041 2>&1
2041 legit-rm a >>.test05_tmptmp_2041 2>&1
2041 legit-rm --force b >>.test05_tmptmp_2041 2>&1
2041 legit-rm --cached c >>.test05_tmptmp_2041 2>&1
2041 legit-status >>.test05_tmptmp_2041 2>&1
2041 legit-show :a >>.test05_tmptmp_2041 2>&1
2041 legit-show :b >>.test05_tmptmp_2041 2>&1
2041 legit-show :c >>.test05_tmptmp_2041 2>&1
2041 legit-show 1:a >>.test05_tmptmp_2041 2>&1
2041 legit-show 1:b >>.test05_tmptmp_2041 2>&1
2041 legit-show 1:c >>.test05_tmptmp_2041 2>&1

# commit
2041 legit-commit -m "try rm without commit" >>.test05_tmptmp_2041 2>&1
2041 legit-status >>.test05_tmptmp_2041 2>&1
2041 legit-show 2:a >>.test05_tmptmp_2041 2>&1
2041 legit-show 2:b >>.test05_tmptmp_2041 2>&1
2041 legit-show 2:c >>.test05_tmptmp_2041 2>&1

# try commit -a mode
echo this should no be added >a
echo this should not be added as well >b
echo this should not be added either >c
2041 legit-commit -a -m "try -a mode" >>.test05_tmptmp_2041 2>&1
2041 legit-status >>.test05_tmptmp_2041 2>&1
2041 legit-add a b >>.test05_tmptmp_2041 2>&1
echo add one line >>a
echo add another line >>b
echo try this line >>c
2041 legit-commit -a -m "add a and b" >>.test05_tmptmp_2041 2>&1
2041 legit-status >>.test05_tmptmp_2041 2>&1

# what if there are irrelevant files in the directory?
echo this is irrelevant file >v
echo this is irrelevant file as well >w
2041 legit-commit -a -m "should not add anything" >>.test05_tmptmp_2041 2>&1
2041 legit-status >>.test05_tmptmp_2041 2>&1


# try wrong legit-rm format
2041 legit-rm -v -f a >>.test05_tmptmp_2041 2>&1
2041 legit-rm -force b >>.test05_tmptmp_2041 2>&1


# <===Compare these two files===>

diff ./.test05_tmptmp ./.test05_tmptmp_2041 >/dev/null
if (test $? -eq 0)
then
	echo "Test05 all good"
else
	echo "Something wrong with test05"
fi