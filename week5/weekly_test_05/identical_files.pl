#!/usr/bin/perl -w

if (@ARGV == 0) {
	print "Usage: ./identical_files.pl <files>\n";
	exit 1;
}

open IN, '<', $ARGV[0] or die;
while (<IN>) {
	chomp;
	push @lines, $_;
}
close IN;

$length = @lines;

foreach $filename (@ARGV) {
	open IN, '<', $filename or die;
	$cnt = 0;
	while (<IN>) {
		chomp;
		if ($_ ne $lines[$cnt]) {
			print "$filename is not identical\n";
			exit 1;
		}
		$cnt ++;
	}
	if ($cnt != $length) {
		print "$filename is not identical\n";
		exit 1;
	}
	close IN;
}

print "All files are identical\n";
