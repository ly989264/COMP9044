#!/usr/bin/perl -w
$pattern = $ARGV[0];
print "pattern=/$pattern/\n";
$string = $ARGV[1];
print "string=\"$string\"\n";
if ($string =~ /($pattern)/) {
	print "match =\"$1\"\n";
} else {
	print "no match\n";
}
#$string =~ /$pattern/;
#print "match =\"$&\"\n";
