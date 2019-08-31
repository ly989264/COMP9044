#!/usr/bin/perl -w

while (<>)
{
	$_ =~ s/[aeiou]//gi;
	push @results, $_;
}

print @results;
