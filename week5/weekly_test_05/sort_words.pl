#!/usr/bin/perl -w

while (<>) {
	chomp;
	push @lines, $_;
}

foreach (@lines) {
	@tmp = split;
	@tmp = sort @tmp;
	print "@tmp\n";
}
