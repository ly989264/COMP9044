#!/usr/bin/perl -w

$target_message = lc($ARGV[0]);

shift @ARGV;

@filenames = glob("./lyrics/*");

%result_hash = ();

foreach (@filenames) {
	my $filename = $_;
	$filename =~ /^.*\/(.*?)\.txt$/ or die;
	my $personname = $1;
	my $real_personname = $personname;
	$real_personname =~ s/_/ /g;
	open IN, '<', "$_" or die;
	my @lines = ();
	while (<IN>) {
		push @lines, lc($_);
	}
	close IN;

	my $line = join("", @lines);
	my @words = split('[^a-zA-Z]+', $line);
	my %word_hash = ();
	my $length = 0;
	foreach (@words) {
		if (/^[a-zA-Z]+$/) {
			if (! defined $word_hash{$_}) {
				$word_hash{$_} = 1;
			} else {
				$word_hash{$_}++;
			}
			$length++;
		}
	}

	my $times = 0;

	$times = $word_hash{$target_message} if defined $word_hash{$target_message};

	my $prob = $times/$length;

	my $result = sprintf("%4d/%6d = %.9f %s\n", $times, $length, $prob, $real_personname);

	$result_hash{$personname} = $result;
}

foreach (sort keys %result_hash) {
	print "$result_hash{$_}";
}
