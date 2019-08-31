#!/usr/bin/perl -w

$dir1 = $ARGV[0];
$dir2 = $ARGV[1];

@files1 = glob("$dir1/*");
@files2 = glob("$dir2/*");

@result = ();

for $file1 (@files1) {
	$real_file1 = $file1;
	$real_file1 =~ s/^.*\///;
	@f1 = ();
	open IN, '<', "$file1" or die;
	while (<IN>) {
		chomp;
		push @f1, $_;
	}
	close IN;
	for $file2 (@files2) {
		$real_file2 = $file2;
		$real_file2 =~ s/^.*\///;
		@f2 = ();
		open IN, '<', "$file2" or die;
		while (<IN>) {
			chomp;
			push @f2, $_;
		}
		close IN;
		if (scalar @f1 != scalar @f2) {
			next;
		}
		$cnt = 0;
		for $index (0..$#f1) {
			if ($f1[$index] eq $f2[$index]) {
				$cnt = $cnt +1;
			}
		}
		if ($cnt != $#f1+1) {
			next;
		}
		if ($real_file1 ne $real_file2) {
			next;
		}
		push @result, $real_file1;
	}
}
@result = sort @result;
for (@result) {
	print $_, "\n";
}
