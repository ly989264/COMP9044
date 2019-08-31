#!/usr/bin/perl -w

$dir = $ARGV[0];
mkdir "$dir.1";
for $eachfile (glob("./$dir/*")) {
	$filename = $eachfile;
	$filename =~ s/^.*\///;
	$targetfilename = "./$dir.1/$filename";
	# copy file
	open IN, "<", "$eachfile" or die;
	open OUT, ">", "$targetfilename" or die;
	while (<IN>) {
		print OUT;
	}
	close IN;
	close OUT;
}
