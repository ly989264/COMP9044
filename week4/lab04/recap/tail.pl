#!/usr/bin/perl -w

$cnt = 10;

@file_list = ();

for $each (@ARGV) {
	if ($each =~ /^\-(\d+)$/) {
		$cnt = $1;
	} else {
		push @file_list, $each;
	}
}

if (scalar @file_list > 0) {
	for $each_file (@file_list) {
		print "==> $each_file <==\n";
		my @lines = ();
		open IN, "<", "$each_file" or die;
		while (<IN>) {
			chomp;
			push @lines, $_;
		}
		close IN;
		my @res_lines = ();
		for (1..$cnt) {
			push @res_lines, pop(@lines);
		}
		for (1..$cnt) {
			print pop(@res_lines), "\n";
		}
	}
} else {
	my @lines = ();
	while (<STDIN>) {
		chomp;
		push @lines, $_;
	}
	my @res_lines = ();
	for (1..$cnt) {
		push @res_lines, pop(@lines);
	}
	for (1..$cnt) {
		print pop(@res_lines), "\n";
	}
}
