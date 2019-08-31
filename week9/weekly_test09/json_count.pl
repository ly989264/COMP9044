#!/usr/bin/perl -w

$target_species = $ARGV[0];
$filename = $ARGV[1];

open IN, "<", "$filename" or die "Cannot open $filename\n";
$res = 0;
$prev_num = 0;
while (<IN>) {
	chomp;
	if (/how_many/) {
		s/\D//g;
		$prev_num = $_;
	} elsif (/species/) {
		s/^.*?: //;
		s/\"//g;
		if ($_ eq $target_species) {
			$res = $res + $prev_num;
		}
	}
}
print $res, "\n";
