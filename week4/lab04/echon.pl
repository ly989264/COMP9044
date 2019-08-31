#!/usr/bin/perl -w

$length = @ARGV;
if ($length != 2) {
	print "Usage: ./echon.pl <number of lines> <string>\n";
} else {
	if (not $ARGV[0] =~ '^[0-9]+$') {
		print "./echon.pl: argument 1 must be a non-negative integer\n";
	} else {
		foreach (1..$ARGV[0]) {
			print "$ARGV[1]\n";
		}
	}
}

