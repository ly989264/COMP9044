#!/usr/bin/perl -w

# get the hash list of all artists

@filenames = glob("./lyrics/*");

%overall_hash = ();
@artist_list = ();
%length_hash = ();

foreach (@filenames) {
	my $filename = $_;
	$filename =~ /^.*\/(.*?)\.txt$/ or die;
	my $personname = $1;
	push @artist_list, $personname;
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

	$length_hash{$personname} = $length;

	$overall_hash{$personname} = \%word_hash;
}

foreach $target_filename (@ARGV) {
	# target_filename is the file
	# get all words, and store them into a list
	my %person_prob_hash = ();
	open IN, '<', $target_filename or die "cannot open file $target_filename";
	my @lines = ();
	while (<IN>) {
		push @lines, $_;
	}
	close IN;
	my $line = join("", @lines);
	my @tmp_words = split('[^a-zA-Z]+', $line);
	my $temp = '';
	my $cnt = 0;
	foreach $each_word (sort @tmp_words) {
		if ($each_word =~ /^[a-zA-Z]+$/) {
			$each_word = lc($each_word);
			# here is the real word
			foreach $artist (@artist_list) {
				if (defined $person_prob_hash{$artist}) {
					my $ref = $overall_hash{$artist};
					my %tmp_hash = %$ref;
					my $tmp_value = 0;
					if (defined $tmp_hash{$each_word}) {
						$tmp_value = $tmp_hash{$each_word};
					}
					$person_prob_hash{$artist} = $person_prob_hash{$artist} + log(($tmp_value + 1)/$length_hash{$artist});
					# print log(($tmp_value + 1)/$length_hash{$artist}), " $artist $each_word\n";
				} else {
					my $ref = $overall_hash{$artist};
					my %tmp_hash = %$ref;
					my $tmp_value = 0;
					if (defined $tmp_hash{$each_word}) {
						$tmp_value = $tmp_hash{$each_word};
					}
					$person_prob_hash{$artist} = log(($tmp_value + 1)/$length_hash{$artist});
					# print log(($tmp_value + 1)/$length_hash{$artist}), " $artist $each_word\n";
				}
			}
		}
	}
	my $name = '';
	my $highest_value = -300000;
	foreach (keys %person_prob_hash) {
		# print "$_, $person_prob_hash{$_}\n";
		my $real_personname = $_;
		$real_personname =~ s/_/ /g;
		if ($person_prob_hash{$_} > $highest_value) {
			$name = $real_personname;
			$highest_value = $person_prob_hash{$_};

		}
	}
	printf("%s most resembles the work of %s (log-probability=%.1f)\n", $target_filename, $name, $highest_value);
}
