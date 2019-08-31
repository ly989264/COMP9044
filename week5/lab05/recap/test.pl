#!/usr/bin/perl -w

$a = "b";
%hash = (a => 4, "b" => 5);
print $hash{"a"}, "\n";
print $hash{a}, "\n";
print $hash{$a}, "\n";
if (defined $hash{$a}) {
	print "Defined\n";
}
$hash{aaa} = 6;
for (keys %hash) {
	print $_, "\n";
}
