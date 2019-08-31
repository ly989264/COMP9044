#!/usr/bin/perl -w

foreach $filename (@ARGV) {
	open IN, "<", "$filename" or die "cannot open $filename\n";
	open OUT, ">", "$filename.tmp" or die;
	print OUT "import API_URL from './backend_url.js';";
	while (<IN>) {
		if (/\"http:\/\/127\.0\.0\.1:5000/) {
			s/\"http:\/\/127\.0\.0\.1:5000/API_URL+\"/;
		}
		print OUT $_;
	}
	close IN;
	close OUT;
}
