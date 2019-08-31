#!/usr/bin/perl -w

# I think the main idea is to run the shuffle.pl several times until it generates all possible results


# first create the test file
`seq 0 4 >numbers.txt`;

# the number of all possible results is 5*4*3*2*1=120

$cnt = 0;
$count = 0;
while ($cnt < 120 and $count < 2000)
{
	$dula = "";
	open IN, './shuffle.pl <numbers.txt|';
	while (<IN>)
	{
		chomp;
		$dula .= $_;
	}
	print "$dula  ";
	if (! defined $results[$dula])
	{
		$results[$dula] = 1;
		$cnt++;
	}
	$count++;
	print "$cnt  $count\n";
}

if ($count >= 1500)
{
	print "Not good\n";
}
else
{
	print "Correct\n";
}

