#!/usr/bin/perl -w

$cnt = 0;
$bad = 0;
while (<>) {
	s/[^a-zA-Z]/ /g;
	my @list = split(/ +/, $_);
	$cnt += scalar @list;
	for $each (@list) {
		if ($each =~ /^[^a-zA-Z]*$/) {
			$bad++;
		}
	}
}
print $cnt, "\n";
print $bad, "\n";
print $cnt-$bad, "\n";
