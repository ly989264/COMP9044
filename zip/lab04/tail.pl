#!/usr/bin/perl -w

$n = 10;

foreach (@ARGV)
{
	if ($_ =~ '^-[0-9]+$')
	{
		$_ =~ s/^-([0-9]+)$/$1/;
		$n = $_;
	}
	else
	{
		push @files, $_;
	}
}

$length = @files;

if (not @files)
{
	$filelength = 0;
	@data=();
	while ($line = <STDIN>)
	{
		push @data, $line;
		$filelength++;
	}
	@newdata=();
	if ($filelength >= $n)
	{
		$actualn = $n;
	}
	else
	{
		$actualn = $filelength;
	}
	foreach (1..$actualn)
	{
		$result = pop @data;
		push @newdata, $result;
	}
	foreach (1..$actualn)
	{
		$final_result = pop @newdata;
		print $final_result;
	}
}
else
{
	foreach (@files)
	{
		$filelength = 0;
		open IN, '<', $_ or die "$0: can't open $_\n";
		if ($length > 1)
		{
			print "==> $_ <==\n";
		}
		@data=();
		while ($line = <IN>)
		{
			push @data, $line;
			$filelength++;
		}
		@newdata=();
		if ($filelength >= $n)
		{
			$actualn = $n;
		}
		else
		{
			$actualn = $filelength;
		}
		foreach (1..$actualn)
		{
			$result = pop @data;
			push @newdata, $result;
		}
		foreach (1..$actualn)
		{
			$final_result = pop @newdata;
			print $final_result;
		}
	}
}
