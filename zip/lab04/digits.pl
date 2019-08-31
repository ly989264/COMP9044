#!/usr/bin/perl -w

while (<>)
{
	$_ =~ s/[0-4]/</g;
	$_ =~ s/[6-9]/>/g;
	print;
}
