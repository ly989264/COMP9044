#!/bin/dash


# this test script focuses on the commands in subset0


# need tmp files named .test01_tmptmp and .test01_tmptmp_2041
# these filenames should not be used by others


# do the cleaning
rm -rf .legit >/dev/null 2>&1
rm .test01_tmptmp >/dev/null 2>&1
rm .test01_tmptmp_2041 >/dev/null 2>&1


# <===Run my legit programs===>
echo this is the first line >a
echo line 1 >b
legit-init >>.test01_tmptmp 2>&1
legit-add a b >>.test01_tmptmp 2>&1
legit-commit -m first-commit >>.test01_tmptmp 2>&1
legit-log >>.test01_tmptmp 2>&1
legit-show :a >>.test01_tmptmp 2>&1
legit-show :b >>.test01_tmptmp 2>&1
legit-show 0:a >>.test01_tmptmp 2>&1
legit-show 0:b >>.test01_tmptmp 2>&1
echo this is the second line >>a
legit-add a >>.test01_tmptmp 2>&1
legit-commit -m second-commit-add-a >>.test01_tmptmp 2>&1
legit-log >>.test01_tmptmp 2>&1
legit-show :a >>.test01_tmptmp 2>&1
legit-show 0:a >>.test01_tmptmp 2>&1
legit-show 1:a >>.test01_tmptmp 2>&1
legit-show :b >>.test01_tmptmp 2>&1
legit-show 0:b >>.test01_tmptmp 2>&1
legit-show 1:b >>.test01_tmptmp 2>&1
echo add here >>b
legit-add b >>.test01_tmptmp 2>&1
legit-commit -m third-commit-add-b >>.test01_tmptmp 2>&1
legit-log >>.test01_tmptmp 2>&1
legit-show :a >>.test01_tmptmp 2>&1
legit-show 0:a >>.test01_tmptmp 2>&1
legit-show 1:a >>.test01_tmptmp 2>&1
legit-show 2:a >>.test01_tmptmp 2>&1
legit-show :b >>.test01_tmptmp 2>&1
legit-show 0:b >>.test01_tmptmp 2>&1
legit-show 1:b >>.test01_tmptmp 2>&1
legit-show 2:b >>.test01_tmptmp 2>&1

# <===Run 2041 legit programs===>

rm -rf .legit >/dev/null 2>&1

echo this is the first line >a
echo line 1 >b
2041 legit-init >>.test01_tmptmp_2041 2>&1
2041 legit-add a b >>.test01_tmptmp_2041 2>&1
2041 legit-commit -m first-commit >>.test01_tmptmp_2041 2>&1
2041 legit-log >>.test01_tmptmp_2041 2>&1
2041 legit-show :a >>.test01_tmptmp_2041 2>&1
2041 legit-show :b >>.test01_tmptmp_2041 2>&1
2041 legit-show 0:a >>.test01_tmptmp_2041 2>&1
2041 legit-show 0:b >>.test01_tmptmp_2041 2>&1
echo this is the second line >>a
2041 legit-add a >>.test01_tmptmp_2041 2>&1
2041 legit-commit -m second-commit-add-a >>.test01_tmptmp_2041 2>&1
2041 legit-log >>.test01_tmptmp_2041 2>&1
2041 legit-show :a >>.test01_tmptmp_2041 2>&1
2041 legit-show 0:a >>.test01_tmptmp_2041 2>&1
2041 legit-show 1:a >>.test01_tmptmp_2041 2>&1
2041 legit-show :b >>.test01_tmptmp_2041 2>&1
2041 legit-show 0:b >>.test01_tmptmp_2041 2>&1
2041 legit-show 1:b >>.test01_tmptmp_2041 2>&1
echo add here >>b
2041 legit-add b >>.test01_tmptmp_2041 2>&1
2041 legit-commit -m third-commit-add-b >>.test01_tmptmp_2041 2>&1
2041 legit-log >>.test01_tmptmp_2041 2>&1
2041 legit-show :a >>.test01_tmptmp_2041 2>&1
2041 legit-show 0:a >>.test01_tmptmp_2041 2>&1
2041 legit-show 1:a >>.test01_tmptmp_2041 2>&1
2041 legit-show 2:a >>.test01_tmptmp_2041 2>&1
2041 legit-show :b >>.test01_tmptmp_2041 2>&1
2041 legit-show 0:b >>.test01_tmptmp_2041 2>&1
2041 legit-show 1:b >>.test01_tmptmp_2041 2>&1
2041 legit-show 2:b >>.test01_tmptmp_2041 2>&1


# <===Compare two files===>
diff ./.test01_tmptmp ./.test01_tmptmp_2041 >/dev/null
if (test $? -eq 0)
then
	echo "Test01 all good"
else
	echo "Something wrong of test01"
fi