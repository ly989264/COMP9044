#!/usr/bin/perl -w

$cnt=0;
while (<>)
{
	#push @lines, $_;
	$lines[$cnt] = $_;
	$cnt++;
}

$count = 0;
while ($count < $cnt)
{
	$value = rand($cnt);
	if (defined $lines[$value])
	{
		print $lines[$value];
		$count++;
		delete($lines[$value]);
	}
}
