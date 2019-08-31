#!/bin/dash


# this test script focuses on the combination of commands in subset0 and subset1


# need tmp files named .test04_tmptmp and .test04_tmptmp_2041
# these filenames should not be used by others


# do the cleaning
rm -rf .legit >/dev/null 2>&1
rm .test04_tmptmp >/dev/null 2>&1
rm .test04_tmptmp_2041 >/dev/null 2>&1


# <===Run my legit programs===>

echo seq 0 5 >a
echo heloop >b
echo this is a new line >c
echo husky and golden retriever >d
echo hola hola ho >e

legit-init >>.test04_tmptmp 2>&1
legit-status >>.test04_tmptmp 2>&1
legit-add a b c >>.test04_tmptmp 2>&1
legit-status >>.test04_tmptmp 2>&1
legit-log >>.test04_tmptmp 2>&1
legit-commit -m init-commit >>.test04_tmptmp 2>&1
legit-status >>.test04_tmptmp 2>&1
legit-log >>.test04_tmptmp 2>&1
legit-show :a >>.test04_tmptmp 2>&1
legit-show :b >>.test04_tmptmp 2>&1
legit-show :c >>.test04_tmptmp 2>&1
legit-show :d >>.test04_tmptmp 2>&1
legit-show :e >>.test04_tmptmp 2>&1
rm a
legit-status >>.test04_tmptmp 2>&1
legit-commit -a -m "remove a" >>.test04_tmptmp 2>&1
rm b
legit-add b >>.test04_tmptmp 2>&1
legit-rm c >>.test04_tmptmp 2>&1
legit-status >>.test04_tmptmp 2>&1
legit-commit -m "remove b and c using different ways" >>.test04_tmptmp 2>&1
legit-status >>.test04_tmptmp 2>&1
legit-add d e >>.test04_tmptmp 2>&1
legit-commit -m "add d and e" >>.test04_tmptmp 2>&1
echo border collie >>d
legit-add d >>.test04_tmptmp 2>&1
echo labrador retriever >>d
legit-status >>.test04_tmptmp 2>&1
legit-commit -a -m "border and labrador" >>.test04_tmptmp 2>&1
legit-log >>.test04_tmptmp 2>&1
legit-status >>.test04_tmptmp 2>&1
rm d
legit-status >>.test04_tmptmp 2>&1

# <===Run 2041 legit programs===>

rm -rf .legit >/dev/null 2>&1
echo seq 0 5 >a
echo heloop >b
echo this is a new line >c
echo husky and golden retriever >d
echo hola hola ho >e

2041 legit-init >>.test04_tmptmp_2041 2>&1
2041 legit-status >>.test04_tmptmp_2041 2>&1
2041 legit-add a b c >>.test04_tmptmp_2041 2>&1
2041 legit-status >>.test04_tmptmp_2041 2>&1
2041 legit-log >>.test04_tmptmp_2041 2>&1
2041 legit-commit -m init-commit >>.test04_tmptmp_2041 2>&1
2041 legit-status >>.test04_tmptmp_2041 2>&1
2041 legit-log >>.test04_tmptmp_2041 2>&1
2041 legit-show :a >>.test04_tmptmp_2041 2>&1
2041 legit-show :b >>.test04_tmptmp_2041 2>&1
2041 legit-show :c >>.test04_tmptmp_2041 2>&1
2041 legit-show :d >>.test04_tmptmp_2041 2>&1
2041 legit-show :e >>.test04_tmptmp_2041 2>&1
rm a
2041 legit-status >>.test04_tmptmp_2041 2>&1
2041 legit-commit -a -m "remove a" >>.test04_tmptmp_2041 2>&1
rm b
2041 legit-add b >>.test04_tmptmp_2041 2>&1
2041 legit-rm c >>.test04_tmptmp_2041 2>&1
2041 legit-status >>.test04_tmptmp_2041 2>&1
2041 legit-commit -m "remove b and c using different ways" >>.test04_tmptmp_2041 2>&1
2041 legit-status >>.test04_tmptmp_2041 2>&1
2041 legit-add d e >>.test04_tmptmp_2041 2>&1
2041 legit-commit -m "add d and e" >>.test04_tmptmp_2041 2>&1
echo border collie >>d
2041 legit-add d >>.test04_tmptmp_2041 2>&1
echo labrador retriever >>d
2041 legit-status >>.test04_tmptmp_2041 2>&1
2041 legit-commit -a -m "border and labrador" >>.test04_tmptmp_2041 2>&1
2041 legit-log >>.test04_tmptmp_2041 2>&1
2041 legit-status >>.test04_tmptmp_2041 2>&1
rm d
2041 legit-status >>.test04_tmptmp_2041 2>&1


# <===Compare these two files===>

diff ./.test04_tmptmp ./.test04_tmptmp_2041 >/dev/null
if (test $? -eq 0)
then
	echo "Test04 all good"
else
	echo "Something wrong with test04"
fi