#!/usr/bin/perl -w

$n = 10;

if ($#ARGV == 0)  # the last index of @ARGV is 0, thus the number of elements in @ARGV is 1
{
	if($ARGV[0] =~ /^-\d+$/)
	{
		$ARGV[0] =~ s/-//;
		$n = $ARGV[0];
	}
	else
	{
		print "Invalid parameter.";
	}
}
$cnt = 0;
while (<STDIN>)
{
	if ($cnt >= $n)
	{
		last;
	}
	print;
	$cnt++;
}
