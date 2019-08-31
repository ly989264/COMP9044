#!/bin/dash


# this test script focuses on the error messages of the legit-rm command in subset1


# need tmp files named .test02_tmptmp and .test02_tmptmp_2041
# these filenames should not be used by others


# do the cleaning
rm -rf .legit >/dev/null 2>&1
rm .test02_tmptmp >/dev/null 2>&1
rm .test02_tmptmp_2041 >/dev/null 2>&1


# <===Run my legit programs===>

echo this is the first line >a
echo hi >b
echo line 1 >c
echo hello world >d
echo first line >e

# testing for the condition of no existing .legit repository
# should all raise errors
legit-rm a >>.test02_tmptmp 2>&1
legit-rm --force b >>.test02_tmptmp 2>&1
legit-rm --cached c >>.test02_tmptmp 2>&1

# initialize the repository
legit-init >>.test02_tmptmp 2>&1

# testing commands for the condition of no existing commits
# should all raise errors
legit-rm a >>.test02_tmptmp 2>&1
legit-rm --force b >>.test02_tmptmp 2>&1
legit-rm --cached c >>.test02_tmptmp 2>&1

# add the file, but not commit
legit-add a b c >>.test02_tmptmp 2>&1

# testing for the condition of no existing commits but existence of index files
# should all raise errors
legit-rm a >>.test02_tmptmp 2>&1
legit-rm --force b >>.test02_tmptmp 2>&1
legit-rm --cached c >>.test02_tmptmp 2>&1

# commit the file
legit-commit -a -m first-commit >>.test02_tmptmp 2>&1

# testing for the condition where rm multiple times
legit-rm a >>.test02_tmptmp 2>&1
legit-rm a >>.test02_tmptmp 2>&1
legit-rm --force a >>.test02_tmptmp 2>&1
legit-rm --cached a >>.test02_tmptmp 2>&1

# what if rm --cached first?
legit-rm --cached b >>.test02_tmptmp 2>&1
legit-rm b >>.test02_tmptmp 2>&1

# testing for the condition where rm may violate the file, which is not added to the index
echo hello >>b
legit-rm b >>.test02_tmptmp 2>&1

# testing for the condition where rm may violate the file and the file is added to the index
echo hola >>d
legit-add d >>.test02_tmptmp 2>&1
legit-rm d >>.test02_tmptmp 2>&1

# testing for the condition where rm may violate the file and the file is added to the index, also modify the file in the working directory
echo hola >>e
legit-add e >>.test02_tmptmp 2>&1
echo update again >>e
legit-rm e >>.test02_tmptmp 2>&1

# testing for the condition of removing non-exist files
legit-rm f >>.test02_tmptmp 2>&1

# testing for the condition of incorrect command format
legit-rm -v -f a >>.test02_tmptmp 2>&1
legit-rm --hola b >>.test02_tmptmp 2>&1

# <===Run 2041 legit programs===>

rm -rf .legit >/dev/null 2>&1
echo this is the first line >a
echo hi >b
echo line 1 >c
echo hello world >d
echo first line >e

# testing for the condition of no existing .legit repository
# should all raise errors
2041 legit-rm a >>.test02_tmptmp_2041 2>&1
2041 legit-rm --force b >>.test02_tmptmp_2041 2>&1
2041 legit-rm --cached c >>.test02_tmptmp_2041 2>&1

# initialize the repository
2041 legit-init >>.test02_tmptmp_2041 2>&1

# testing commands for the condition of no existing commits
# should all raise errors
2041 legit-rm a >>.test02_tmptmp_2041 2>&1
2041 legit-rm --force b >>.test02_tmptmp_2041 2>&1
2041 legit-rm --cached c >>.test02_tmptmp_2041 2>&1

# add the file, but not commit
2041 legit-add a b c >>.test02_tmptmp_2041 2>&1

# testing for the condition of no existing commits but existence of index files
# should all raise errors
2041 legit-rm a >>.test02_tmptmp_2041 2>&1
2041 legit-rm --force b >>.test02_tmptmp_2041 2>&1
2041 legit-rm --cached c >>.test02_tmptmp_2041 2>&1

# commit the file
2041 legit-commit -a -m first-commit >>.test02_tmptmp_2041 2>&1

# testing for the condition where rm multiple times
2041 legit-rm a >>.test02_tmptmp_2041 2>&1
2041 legit-rm a >>.test02_tmptmp_2041 2>&1
2041 legit-rm --force a >>.test02_tmptmp_2041 2>&1
2041 legit-rm --cached a >>.test02_tmptmp_2041 2>&1

# what if rm --cached first?
2041 legit-rm --cached b >>.test02_tmptmp_2041 2>&1
2041 legit-rm b >>.test02_tmptmp_2041 2>&1

# testing for the condition where rm may violate the file, which is not added to the index
echo hello >>b
2041 legit-rm b >>.test02_tmptmp_2041 2>&1

# testing for the condition where rm may violate the file and the file is added to the index
echo hola >>d
2041 legit-add d >>.test02_tmptmp_2041 2>&1
2041 legit-rm d >>.test02_tmptmp_2041 2>&1

# testing for the condition where rm may violate the file and the file is added to the index, also modify the file in the working directory
echo hola >>e
2041 legit-add e >>.test02_tmptmp_2041 2>&1
echo update again >>e
2041 legit-rm e >>.test02_tmptmp_2041 2>&1

# testing for the condition of removing non-exist files
2041 legit-rm f >>.test02_tmptmp_2041 2>&1

# testing for the condition of incorrect command format
2041 legit-rm -v -f a >>.test02_tmptmp_2041 2>&1
2041 legit-rm --hola b >>.test02_tmptmp_2041 2>&1


# <===Compare these two files===>

diff ./.test02_tmptmp ./.test02_tmptmp_2041 >/dev/null
if (test $? -eq 0)
then
	echo "Test02 all good"
else
	echo "Something wrong with test02"
fi