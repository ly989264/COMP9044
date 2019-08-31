#!/bin/dash


# this test script focuses on the uses of command legit-merge


# need tmp files named .test08_tmptmp and .test08_tmptmp_2041
# these filenames should not be used by others


# do the cleaning
rm -rf .legit >/dev/null 2>&1
rm .test08_tmptmp >/dev/null 2>&1
rm .test08_tmptmp_2041 >/dev/null 2>&1


# <===Run my legit programs===>

seq 0 10 >a
seq 0 10 >b

legit-init >>.test08_tmptmp 2>&1
legit-add a b >>.test08_tmptmp 2>&1
legit-commit -m "init commit" >>.test08_tmptmp 2>&1
legit-branch b1 >>.test08_tmptmp 2>&1
perl -pi -e 's/2/22/' a
echo 11 >>a
echo 12 >>a
legit-commit -a -m "modify a from master" >>.test08_tmptmp 2>&1
legit-checkout b1 >>.test08_tmptmp 2>&1
seq 0 6 >a
echo add a new line >>a
seq 7 10 >>a
echo add the first line >b
seq 0 10 >>b
legit-commit -a -m "modify two files from b1" >>.test08_tmptmp 2>&1
legit-status >>.test08_tmptmp 2>&1
cat a b >>.test08_tmptmp 2>&1
legit-branch b00 >>.test08_tmptmp 2>&1
legit-checkout b00 >>.test08_tmptmp 2>&1
echo add a line at the beginning >a
seq 0 6 >>a
echo add a new line >>a
seq 8 10 >>a
legit-commit -a -m "modify two files from b00" >>.test08_tmptmp 2>&1
legit-status >>.test08_tmptmp 2>&1
cat a b >>.test08_tmptmp 2>&1
# try to merge of master and b00
legit-checkout master >>.test08_tmptmp 2>&1
legit-status >>.test08_tmptmp 2>&1
cat a b >>.test08_tmptmp 2>&1
legit-merge b00 -m "merge master and b00" >>.test08_tmptmp 2>&1
cat a b >>.test08_tmptmp 2>&1


# <===Run 2041 legit programs===>

rm -rf .legit >/dev/null 2>&1
seq 0 10 >a
seq 0 10 >b

2041 legit-init >>.test08_tmptmp_2041 2>&1
2041 legit-add a b >>.test08_tmptmp_2041 2>&1
2041 legit-commit -m "init commit" >>.test08_tmptmp_2041 2>&1
2041 legit-branch b1 >>.test08_tmptmp_2041 2>&1
perl -pi -e 's/2/22/' a
echo 11 >>a
echo 12 >>a
2041 legit-commit -a -m "modify a from master" >>.test08_tmptmp_2041 2>&1
2041 legit-checkout b1 >>.test08_tmptmp_2041 2>&1
seq 0 6 >a
echo add a new line >>a
seq 7 10 >>a
echo add the first line >b
seq 0 10 >>b
2041 legit-commit -a -m "modify two files from b1" >>.test08_tmptmp_2041 2>&1
2041 legit-status >>.test08_tmptmp_2041 2>&1
cat a b >>.test08_tmptmp_2041 2>&1
2041 legit-branch b00 >>.test08_tmptmp_2041 2>&1
2041 legit-checkout b00 >>.test08_tmptmp_2041 2>&1
echo add a line at the beginning >a
seq 0 6 >>a
echo add a new line >>a
seq 8 10 >>a
2041 legit-commit -a -m "modify two files from b00" >>.test08_tmptmp_2041 2>&1
2041 legit-status >>.test08_tmptmp_2041 2>&1
cat a b >>.test08_tmptmp_2041 2>&1
# try to merge of master and b00
2041 legit-checkout master >>.test08_tmptmp_2041 2>&1
2041 legit-status >>.test08_tmptmp_2041 2>&1
cat a b >>.test08_tmptmp_2041 2>&1
2041 legit-merge b00 -m "merge master and b00" >>.test08_tmptmp_2041 2>&1
cat a b >>.test08_tmptmp_2041 2>&1


# <===Compare these two files===>

diff ./.test08_tmptmp ./.test08_tmptmp_2041 >/dev/null
if (test $? -eq 0)
then
	echo "Test08 all good"
else
	echo "Something wrong with test08"
fi