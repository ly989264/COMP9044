#!/usr/bin/perl -w

$string = $ARGV[0];




sub print_perl {
	($string) = @_;
	$string =~ s/\\/\\\\/g;
	$string =~ s/"/\\"/g;

	$result_string = 'print "'."$string".'\n";';
	return $result_string;
}


$n = $ARGV[0];
$string = $ARGV[1];

foreach (0..$n-1) {
	$string = print_perl($string);
}

print "$string\n";

