#!/usr/bin/perl -w

$x = "123";
$y = 123;
$non = "abc";
$z = 120 . '3';
#print "$z\n";
#if ($x == $y) {
#	print "x == y\n";
#}
#if ($x == $z) {
#	print "x == z\n";
#}
print $x + $y, "\n";
print $x . $y, "\n";
print $x + $non, "\n";
print $y + $non, "\n";
print $x . $non, "\n";
print $y . $non, "\n";
$a = $x eq $y;
print $a, "\n";
$b = 0;
$c = "0";
$d = 0.0;
$e = "0.0";
if ($d) {
	print "b\n";
}
if ($e) {
	print "c\n";
}
open DATE, "date|";
$date = <DATE>;
print $date, "\n";
foreach (1..5) {
	print $_, "\n";
}
print 3**2, "\n";
print 6^2, "\n";
if (-f "input.txt") {
	print "input.txt exists\n";
}
while ($line=<>) {
	print $line;
}
