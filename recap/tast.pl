#!/usr/bin/perl -w

@arr = (1,2,3);
print "@arr\n";
foreach (@arr) {
	print $_, "\n";
}
$line = "345 678";
@arr = $line =~ /(\d\d)(\d)/g;
$arr = $line =~ /(\d\d)(\d)/g;
print "@arr\n";
print "$arr\n";
