#!/usr/bin/perl -w

@result = ();

foreach (@ARGV) {
	if (/[aeiou]{3}/i) {
		push @result, $_;
	}
}

print "@result\n";
