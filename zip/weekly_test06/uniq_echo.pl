#!/usr/bin/perl -w

%hash_table = ();
@result = ();
foreach (@ARGV) {
	if (! defined $hash_table{$_}) {
		$hash_table{$_} = 1;
		push @result, $_;
	}
}
print "@result\n";
