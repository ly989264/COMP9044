#!/usr/bin/perl -w

$start = $ARGV[0];
$end = $ARGV[1];
$filename = $ARGV[2];

open OUT, '>>', $filename or die;

foreach ($start..$end)
{
	print OUT $_, "\n";
}

close OUT;
