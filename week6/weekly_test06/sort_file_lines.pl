#!/usr/bin/perl -w

$filename = $ARGV[0];

%hash_table = ();

open IN, '<', "$filename" or die;

while (<IN>) {
	chomp;
	my @line = split(//, $_);
	if (defined $hash_table{scalar @line}) {
		my $ref = $hash_table{scalar @line};
		my @arr = @$ref;
		push @arr, $_;
		$hash_table{scalar @line} = \@arr;
	} else {
		my @arr = ();
		push @arr, $_;
		$hash_table{scalar @line} = \@arr;
	}
}

foreach (sort{$a <=> $b} keys %hash_table) {
	my $ref = $hash_table{$_};
	my @arr = @$ref;
	foreach $each_line (sort @arr) {
		print "$each_line\n";
	}
}
