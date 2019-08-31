#!/usr/bin/perl -w

# example.txt => .example.txt.0

foreach $source_filename (@ARGV) {
	$cnt = 0;
	while (1) {
		$target_filename = ".".$source_filename.".".$cnt;
		# check the existence of the target_filename
		if (-f $target_filename) {
			$cnt++;
		} else {
			open IN, '<', $source_filename or die "cannot open file $source_filename\n";
			open OUT, '>', $target_filename or die "cannot open file $target_filename\n";
			while (<IN>) {
				print OUT $_;
			}
			print "Backup of '$source_filename' saved as '$target_filename'\n";
			last;
		}
	}	
}
