#!/usr/bin/perl -w

$n = 10;
if($ARGV[0] =~ /^-\d+$/)
{
	$ARGV[0] =~ s/-//;
	$n = $ARGV[0];
}
$cnt = 0;
foreach $file (@ARGV)
{
	next if $file =~ /^-\d+$/;
	if ($file eq "-")
	{
		$file_handler = STDIN;
	}
	else
	{
		open $file_handler, '<', $file;
	}
	while (<$file_handler>)
	{
		if ($cnt >= $n)
		{
			last;
		}
		print;
		$cnt++;
	}
}
