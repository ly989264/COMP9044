#!/usr/bin/perl -w

$n = $ARGV[0];

%hash_table = ();

while (<STDIN>) {
	chomp;
	if (defined $hash_table{$_} and $hash_table{$_} == $n - 1) {
		print "Snap: $_\n";
		exit 0;
	} elsif (defined $hash_table{$_}) {
		$hash_table{$_}++;
	} else {
		$hash_table{$_} = 1;
	}
}
