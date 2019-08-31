#!/bin/dash


# this test script focuses on the uses of all commands in subset 0 to 2


# need tmp files named .test09_tmptmp and .test09_tmptmp_2041
# these filenames should not be used by others


# do the cleaning
rm -rf .legit >/dev/null 2>&1
rm .test09_tmptmp >/dev/null 2>&1
rm .test09_tmptmp_2041 >/dev/null 2>&1


# <===Run my legit programs===>

echo line 1 >a
echo this is the first line >b

legit-init >>.test09_tmptmp 2>&1
legit-add a >>.test09_tmptmp 2>&1
legit-commit -m first-commit >>.test09_tmptmp 2>&1
echo line 2 >>a
echo this is the second line >>b
legit-commit -a -m "should only commit file a" >>.test09_tmptmp 2>&1
legit-status >>.test09_tmptmp 2>&1
legit-branch b1 >>.test09_tmptmp 2>&1
legit-checkout b1 >>.test09_tmptmp 2>&1
echo this is the third line >>c
legit-checkout master >>.test09_tmptmp 2>&1
legit-add b >>.test09_tmptmp 2>&1
legit-checkout b1 >>.test09_tmptmp 2>&1
legit-commit -m "should add b from b1" >>.test09_tmptmp 2>&1
legit-status >>.test09_tmptmp 2>&1
legit-checkout master >>.test09_tmptmp 2>&1
legit-status >>.test09_tmptmp 2>&1
legit-show :b >>.test09_tmptmp 2>&1
legit-show 1:b >>.test09_tmptmp 2>&1
legit-merge b1 -m "should add b to the master" >>.test09_tmptmp 2>&1
legit-status >>.test09_tmptmp 2>&1
legit-show :b >>.test09_tmptmp 2>&1
legit-branch b2 >>.test09_tmptmp 2>&1
legit-checkout b2 >>.test09_tmptmp 2>&1
echo line 0 >a
echo line 1 >>a
echo line 2 >>a
legit-commit -a -m "modify a" >>.test09_tmptmp 2>&1
legit-status >>.test09_tmptmp 2>&1
legit-checkout b1 >>.test09_tmptmp 2>&1
legit-merge b2 -m "merge b2 in b1" >>.test09_tmptmp 2>&1
legit-status >>.test09_tmptmp 2>&1
legit-show :a >>.test09_tmptmp 2>&1
legit-checkout b2 >>.test09_tmptmp 2>&1
legit-rm a >>.test09_tmptmp 2>&1
legit-checkout master >>.test09_tmptmp 2>&1
legit-merge b2 -m "merge b2 in master" >>.test09_tmptmp 2>&1
legit-status >>.test09_tmptmp 2>&1
legit-log >>.test09_tmptmp 2>&1


# <===Run 2041 legit programs===>

rm -rf .legit >/dev/null 2>&1
echo line 1 >a
echo this is the first line >b

2041 legit-init >>.test09_tmptmp_2041 2>&1
2041 legit-add a >>.test09_tmptmp_2041 2>&1
2041 legit-commit -m first-commit >>.test09_tmptmp_2041 2>&1
echo line 2 >>a
echo this is the second line >>b
2041 legit-commit -a -m "should only commit file a" >>.test09_tmptmp_2041 2>&1
2041 legit-status >>.test09_tmptmp_2041 2>&1
2041 legit-branch b1 >>.test09_tmptmp_2041 2>&1
2041 legit-checkout b1 >>.test09_tmptmp_2041 2>&1
echo this is the third line >>c
2041 legit-checkout master >>.test09_tmptmp_2041 2>&1
2041 legit-add b >>.test09_tmptmp_2041 2>&1
2041 legit-checkout b1 >>.test09_tmptmp_2041 2>&1
2041 legit-commit -m "should add b from b1" >>.test09_tmptmp_2041 2>&1
2041 legit-status >>.test09_tmptmp_2041 2>&1
2041 legit-checkout master >>.test09_tmptmp_2041 2>&1
2041 legit-status >>.test09_tmptmp_2041 2>&1
2041 legit-show :b >>.test09_tmptmp_2041 2>&1
2041 legit-show 1:b >>.test09_tmptmp_2041 2>&1
2041 legit-merge b1 -m "should add b to the master" >>.test09_tmptmp_2041 2>&1
2041 legit-status >>.test09_tmptmp_2041 2>&1
2041 legit-show :b >>.test09_tmptmp_2041 2>&1
2041 legit-branch b2 >>.test09_tmptmp_2041 2>&1
2041 legit-checkout b2 >>.test09_tmptmp_2041 2>&1
echo line 0 >a
echo line 1 >>a
echo line 2 >>a
2041 legit-commit -a -m "modify a" >>.test09_tmptmp_2041 2>&1
2041 legit-status >>.test09_tmptmp_2041 2>&1
2041 legit-checkout b1 >>.test09_tmptmp_2041 2>&1
2041 legit-merge b2 -m "merge b2 in b1" >>.test09_tmptmp_2041 2>&1
2041 legit-status >>.test09_tmptmp_2041 2>&1
2041 legit-show :a >>.test09_tmptmp_2041 2>&1
2041 legit-checkout b2 >>.test09_tmptmp_2041 2>&1
2041 legit-rm a >>.test09_tmptmp_2041 2>&1
2041 legit-checkout master >>.test09_tmptmp_2041 2>&1
2041 legit-merge b2 -m "merge b2 in master" >>.test09_tmptmp_2041 2>&1
2041 legit-status >>.test09_tmptmp_2041 2>&1
2041 legit-log >>.test09_tmptmp_2041 2>&1


# <===Compare these two files===>

diff ./.test09_tmptmp ./.test09_tmptmp_2041 >/dev/null
if (test $? -eq 0)
then
	echo "Test09 all good"
else
	echo "Something wrong with test09"
fi