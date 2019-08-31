#!/usr/bin/perl -w

while (<>) {
	chomp;
	if(/^\-?(\d+(\.\d+)?|\.\d+)$/) {
		if(/^\-?\d+(\.[01234]\d*)?$/) {
			s/\.\d*//;
			print $_, "\n";
		} elsif(/^\-?\d+\.[56789]\d*$/) {
			s/\.\d*$//;
			if ($_ < 0) {
				$_--;
			} else {
				$_++;
			}
			print $_, "\n";
		} elsif(/^\-?\.[01234]\d*$/) {
			print "0\n";
		} else {
			if (/^\-/) {
				print "-1\n";
			} else {
				print "1\n";
			}
		}
	}
}

print "\n";
$line = "abc 523 abd 234";
@res = $line =~ /(\d\d)(\d)/g;
print "res is @res\n";
