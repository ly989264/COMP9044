#!/usr/bin/perl -w

while (<>) {
	push @lines, $_;
}

$cnt = 0;
$line = join("", @lines);
@words = split('[^a-zA-Z]+', $line);
foreach (@words) {
	if (/^[^a-zA-Z]*$/) {
		$cnt++;
	}
}
$length = @words - $cnt;
print "$length words\n";
