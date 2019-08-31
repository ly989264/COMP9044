rm -rf .legit >/dev/null 2>&1
seq 0 10 >a
seq 0 10 >b

2041 legit-init
2041 legit-add a b
2041 legit-commit -m "init commit"
2041 legit-branch b1
perl -pi -e 's/2/22/' a
echo 11 >>a
echo 12 >>a
2041 legit-commit -a -m "modify a from master"
2041 legit-checkout b1
seq 0 6 >a
echo add a new line >>a
seq 7 10 >>a
echo add the first line >b
seq 0 10 >>b
2041 legit-commit -a -m "modify two files from b1"
2041 legit-status
2041 legit-log
cat a b
2041 legit-branch b00
2041 legit-checkout b00
echo add a line at the beginning >a
seq 0 6 >>a
echo add a new line >>a
seq 8 10 >>a
2041 legit-commit -a -m "modify two files from b00"
2041 legit-status
2041 legit-log
cat a b
# try to merge of master and b00
2041 legit-checkout master
2041 legit-status
2041 legit-log
2041 legit-merge b00 -m "merge master and b00"
2041 legit-log