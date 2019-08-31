#!/usr/bin/perl -w

# first, save the files in the current directory

$cnt = 0;

while (1) {
	$target_dirname = ".snapshot."."$cnt";
	if (-d $target_dirname) {
		$cnt++;
	} else {
		mkdir $target_dirname;
		@files = glob("./*");
		foreach (@files) {
			if (-f $_ and not ($_ =~ /^\.\/\./ or $_ =~ /snapshot\.pl/)) {
				open IN, '<', $_ or die "cannot open file $_\n";
				open OUT, '>', "$target_dirname/$_" or die "cannot open file $target_dirname/$_\n";
				while ($line = <IN>) {
					print OUT $line;
				}
				close IN;
				close OUT;
			}
		}
		last;
	}
}

print "Creating snapshot $cnt\n";

if ($ARGV[0] =~ /load/i) {
	$required_dirname = ".snapshot."."$ARGV[1]";
	@required_files = glob("./$required_dirname/*");
	foreach (@required_files) {
		open IN, '<', $_ or die "cannot open file $_\n";
		$_ =~ /^.*\/(.*?)$/ or die "what is this $_\n";
		open OUT, '>', "./$1" or die "cannot open file $1\n";
		while ($line = <IN>) {
			print OUT $line;
		}
		close IN;
		close OUT;
	}
	print "Restoring snapshot $ARGV[1]\n";
}
