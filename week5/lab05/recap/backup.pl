#!/usr/bin/perl -w

for $eachfile (@ARGV) {
	my $cnt = 0;
	while (-f "$eachfile.$cnt") {
		$cnt++;
	}
	open IN, "<", "$eachfile" or die;
	open OUT, ">", "$eachfile.$cnt" or die;
	while (<IN>) {
		print OUT;
	}
	close IN;
	close OUT;
	print "Backup of '$eachfile' saved as '$eachfile.$cnt'\n";
}
