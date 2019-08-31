#!/usr/bin/perl -w

@lines = ();

open IN, '<', "$ARGV[0]" or die;
while (<IN>) {
	chomp;
	push @lines, $_;
}
close IN;
$num_lines = @lines;
if ($num_lines == 0) {
	exit 0;
}
if ($num_lines % 2 == 0) {
	print "$lines[$num_lines/2-1]\n";
	print "$lines[$num_lines/2]\n";
} else {
	print "$lines[($num_lines-1)/2]\n";
}
