#!/usr/bin/perl -w

$n = $ARGV[0];
$filename = $ARGV[1];
$cnt = 0;
open IN, '<', $filename;
while (<IN>)
{
	$cnt++;
	if ($cnt == $n)
	{
		print $_;
		last;
	}
}

