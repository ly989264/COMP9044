#!/usr/bin/perl -w

$cnt = 0;
open IN, "<", $ARGV[0] or die;
while (<IN>) {
	if (/price/) {
		s/^.*?\$(\d+\.?\d*)\D*$/$1/;
		$cnt += $_;
	}
}
printf("\$%.2f\n",$cnt); 
