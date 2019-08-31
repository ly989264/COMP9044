#!/usr/bin/perl -w

open IN, '<', $ARGV[0] or die "cannot open file for read\n";
while (<IN>) {
	chomp;
	s/\d/\#/g;
	push @lines, $_;
}
close IN;
open OUT, '>', $ARGV[0] or die "cannot open file for write\n";
foreach (@lines) {
	print OUT "$_\n";
}
close OUT;
