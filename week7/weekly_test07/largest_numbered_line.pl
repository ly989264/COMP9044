#!/usr/bin/perl -w

@lines = ();
$current_largest_num = -1;
while (<>) {
	chomp;
	$backup = $_;
	while (s/(\-?\d+\.\d+)// || s/(\-?\.\d+)// || s/(\-?\d+(\.\d+)?)//) {
		if ($1 > $current_largest_num) {
			@lines = ();
			push @lines, $backup;
			$current_largest_num = $1;
		} elsif ($1 == $current_largest_num) {
			push @lines, $backup;
		}
	}
}
foreach (@lines) {
	print $_, "\n";
}
