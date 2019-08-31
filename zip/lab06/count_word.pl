#!/usr/bin/perl -w

$target_message = lc($ARGV[0]);

shift @ARGV;

while (<>) {
	push @lines, lc($_);
}

$line = join("", @lines);
@words = split('[^a-zA-Z]+', $line);
%word_hash = ();
foreach (@words) {
	if (/^[a-zA-Z]+$/) {
		if (! defined $word_hash{$_}) {
			$word_hash{$_} = 1;
		} else {
			$word_hash{$_}++;
		}
	}
}



$times = 0;

$times = $word_hash{$target_message} if defined $word_hash{$target_message};

print "$target_message occurred $times times\n";
