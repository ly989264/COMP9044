#!/usr/bin/perl -w

$string = $ARGV[0];

$string =~ s/\\/\\\\/g;
$string =~ s/"/\\"/g;

$result_string = 'print "'."$string".'\n";';
print "$result_string";
