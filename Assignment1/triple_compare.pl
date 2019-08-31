#!/usr/bin/perl -w


sub find_lcs {
	# find the longest common substring of two strings
	# the parameters are two references of lists
	# use dynamic programming
	($ref_s1, $ref_s2) = @_;
	my @list1 = @$ref_s1;
	my @list2 = @$ref_s2;
	my $tmp_len = 0;
	@result_list = ();
	# have to use index to get the LCS
	my $length1 = @list1;
	my $length2 = @list2;
	foreach $i (0..$length1-1) {
		$flag = 0;
		@lcs=();
		foreach $j ($i..$length1-1) {
			foreach $k ($flag..$length2-1) {
				if ($list1[$j] eq $list2[$k]) {
					push @lcs, $list1[$j];
					$flag = $k + 1;
				}
			}
		}
		if (@lcs > $tmp_len) {  # what if equal???
			$tmp_len = @lcs;
			@result_list = @lcs;
		}
	}
	return @result_list;
}


sub find_seq {
	# find the sequence of two lists
	# the parameters are references of three lists: flist1, flist2, LCS_list
	my ($ref_s1, $ref_s2, $ref_lcs) = @_;
	my @flist1 = @$ref_s1;
	my @flist2 = @$ref_s2;
	my @lcs_list = @$ref_lcs;
	# print "@lcs_list\n";
	my $length1 = @flist1;
	my $length2 = @flist2;
	my $length_lcs = @lcs_list;
	my @dseq_1 = ();
	my @dseq_2 = ();
	# need to use index
	my $i_flag = 0;
	my $j_flag = 0;
	my $next_i = 0;
	foreach $lcs_index (0..$length_lcs-1) {
		# print "lcs_list: $lcs_list[$lcs_index]\n";
		$i_tmp = -1;
		$j_tmp = -1;
		foreach $i ($i_flag..$length1-1) {
			next if $flist1[$i] ne $lcs_list[$lcs_index];
			if ($lcs_index < $length_lcs-1 and $lcs_list[$lcs_index + 1] eq $lcs_list[$lcs_index]) {
				# match the first directly
				$i_tmp = $i;
				$i_flag = $i +1;
				# print "match from v1, $i_tmp\n";
				last;
			}
			if ($i < $length1-1 and $flist1[$i + 1] eq $flist1[$i]) {
				# two possibilities, but how to represent?
				$i_tmp = $i;
				$i_flag = $i + 1;
				# print "match from v2, $i_tmp\n";
				last;
			}
			$i_tmp = $i;
			$i_flag = $i +1;
			last;
		}
		foreach $j ($j_flag..$length2-1) {
			next if $flist2[$j] ne $lcs_list[$lcs_index];
			if ($lcs_index < $length_lcs-1 and $lcs_list[$lcs_index + 1] eq $lcs_list[$lcs_index]) {
				# match the first directly
				$j_tmp = $j;
				$j_flag = $j +1;
				last;
			}
			if ($j < $length2-1 and $flist2[$j + 1] eq $flist2[$j]) {
				# two possibilities, but how to represent?
				$j_tmp = $j;
				$j_flag = $j +1;
				last;
			}
			$j_tmp = $j;
			$j_flag = $j + 1;
			last;
		}
		while ($i_tmp ne '-1' and $i_tmp > $next_i) {
			push @dseq_1, $next_i;
			push @dseq_2, -5;
			$next_i++;
		}
		if ($i_tmp ne '-1' and j_tmp ne '-1') {
			push @dseq_1, $i_tmp;
			push @dseq_2, $j_tmp;
			$next_i++;
		}
	}
	if ($#dseq_1 < $#flist1) {
		foreach ($#dseq_1+1..$#flist1) {
			push @dseq_1, $flist1[$_];
			push @dseq_2, -5;
		}
	}
	# print "-@dseq_1\n";
	# print "-@dseq_2\n";
	$prev = -1;
	my @result_seq = ();
	# what if I do not distinguish delete and modify
	foreach (0..$#dseq_1) {
		# $_ is the index
		if ($dseq_2[$_] eq '-5'){
			push @result_seq, 0;
			push @result_seq, 1;
			if ($_ < $#dseq_1 and $dseq_2[$_+1] == $prev+1) {
				next;
			}
			$prev++;
			next;
		}
		if ($dseq_2[$_] == $prev + 1) {
			push @result_seq, 0;
			push @result_seq, 0;
			$prev++;
			next;
		}
		push @result_seq, 2;
		push @result_seq, 0;
		$prev = $dseq_2[$_];
	}
	# if add in the end
	if ($prev < $#flist2) {
		push @result_seq, 2;
	} else {
		push @result_seq, 0;
	}
	# # if deleted in the end
	# if ($#result_seq != $#flist1 * 2 + 1) {
	# 	my $times = ($#flist1 * 2 + 1 - $#result_seq)/2;
	# 	foreach (0..$times-1) {
	# 		push @result_seq, 1;
	# 		push @result_seq, 0;
	# 	}
	# }
	# print "-@result_seq\n";
	return (\@result_seq, \@dseq_1, \@dseq_2);
}


sub analyse_seqs {
	# analyse the pattern
	# the parameters are references of two seq lists
	($ref_s1, $ref_s2) = @_;
	my @seq1 = @$ref_s1;
	my @seq2 = @$ref_s2;

	# test the interference of two seqs
	# again, use the index because I want to find the elements of the similar positions
	foreach (0..$#seq1) {
		# $_ is the index
		if ($seq1[$_] != 0 and $seq2[$_] != 0) {
			# cannot merge
			# print "Port 1, $_\n";
			return 1;
		}
		if ($_ < $#seq1 and $seq1[$_] != 0 and $seq2[$_ + 1] != 0) {
			# cannot merge
			# print "Port 2\n";
			return 1;
		}
		if ($_ < $#seq1-1 and $seq1[$_] == 1 and $seq2[$_ + 2] == 1) {
			# cannot merge
			# print "Port 3\n";
			return 1;
		}
	}
	foreach (0..$#seq2) {
		# $_ is the index
		if ($_ < $#seq2 and $seq2[$_] != 0 and $seq1[$_ + 1] != 0) {
			# cannot merge
			# print "Port 4\n";
			return 1;
		}
		if ($_ < $#seq2-1 and $seq2[$_] == 1 and $seq1[$_ + 2] == 1) {
			# cannot merge
			# print "Port 5\n";
			return 1;
		}
	}
	return 0;
}


sub get_merge_file {
	# get the merge file
	# need to pass the analyse_seqs function first
	# the parameters are ref_to_list1, ref_to_list2, ref_to_list3, ref_to_seq12, ref_to_seq13, ref_to_seq12_1, 2, 13_1, 2

	my ($ref_l1, $ref_l2, $ref_l3, $ref_s1, $ref_s2, $ref_seq12_1, $ref_seq12_2, $ref_seq13_1, $ref_seq13_2) = @_;
	my @list1 = @$ref_l1;
	my @list2 = @$ref_l2;
	my @list3 = @$ref_l3;
	my @seq1 = @$ref_s1;
	my @seq2 = @$ref_s2;
	my @seq12_1 = @$ref_seq12_1;
	my @seq12_2 = @$ref_seq12_2;
	my @seq13_1 = @$ref_seq13_1;
	my @seq13_2 = @$ref_seq13_2;
	# print "@list1\n";
	# print "@list2\n";
	# print "@list3\n";
	# print "@seq12_1\n";
	# print "@seq12_2\n";
	# print "@seq13_1\n";
	# print "@seq13_2\n";
	# print "@seq1\n";
	# print "@seq2\n";


	@result = ();
	$current_position = 0;
	foreach (0..$#seq1) {
		# $_ is the index of the sequence
		# if want to get index of the list, need to convert
		if ($seq1[$_] == 0 and $seq2[$_] == 0 and $_ % 2 == 0) {
			# even, do nothing
			next;
		}
		if ($seq1[$_] == 0 and $seq2[$_] == 0 and $_ % 2 == 1) {
			# odd, add to the result list
			push @result, $list1[($_ - 1) / 2];
			next;
		}
		if ($seq1[$_] == 1) {
			# modified or deleted
			$current_position = ($_ - 1) / 2;
			if ($current_position == 0) {
				if ($seq12_2[1] == 0) {
					# position 0 delete
					# do nothing and continue
					next;
				} else {
					# position 0 modified
					# add the new position 0
					$last_index = $seq12_2[1];
					foreach $data_index (0..$last_index-1) {
						push @result, $list2[$data_index];
					}
				}
			} elsif ($current_position == $#list1) {
				if ($seq12_2[$#list1-1] == $#list2) {
					# position delete
					# do nothing and continue
					next;
				} else {
					# position modified
					# add the new position
					$first_index = $seq12_2[$current_position-1];
					foreach $data_index ($first_index+1..$#list2) {
						push @result, $list2[$data_index];
					}
				}
			} else {
				$first_index = $seq12_2[$current_position-1];
				$last_index = $seq12_2[$current_position+1];
				foreach $data_index ($first_index+1..$last_index-1) {
					push @result, $list2[$data_index];
				}
			}
		}
		if ($seq2[$_] == 1) {
			# modified or deleted
			$current_position = ($_ - 1) / 2;
			if ($current_position == 0) {
				if ($seq13_2[1] == 0) {
					# position 0 delete
					# do nothing and continue
					next;
				} else {
					# position 0 modified
					# add the new position 0
					$last_index = $seq13_2[1];
					foreach $data_index (0..$last_index-1) {
						push @result, $list3[$data_index];
					}
				}
			} elsif ($current_position == $#list1) {
				if ($seq13_2[$#list1-1] == $#list3) {
					# position delete
					# do nothing and continue
					next;
				} else {
					# position modified
					# add the new position
					$first_index = $seq13_2[$current_position-1];
					foreach $data_index ($first_index+1..$#list3) {
						push @result, $list3[$data_index];
					}
				}
			} else {
				$first_index = $seq13_2[$current_position-1];
				$last_index = $seq13_2[$current_position+1];
				foreach $data_index ($first_index+1..$last_index-1) {
					push @result, $list3[$data_index];
				}
			}
		}
		if ($seq1[$_] == 2) {
			# add new items
			if ($_ == 0) {
				$last_index = $seq12_2[0];
				foreach $data_index (0..$last_index-1) {
					push @result, $list2[$data_index];
				}
			} elsif ($_ == $#seq1) {
				$first_index = $seq12_2[$_ / 2 - 1];
				foreach $data_index ($first_index+1..$#list2) {
					push @result, $list2[$data_index];
				}
			} else {
				$first_index = $seq12_2[$_ / 2 - 1];
				$last_index = $seq12_2[$_ / 2];
				foreach $data_index ($first_index+1..$last_index-1) {
					push @result, $list2[$data_index];
				}
			}
		}
		if ($seq2[$_] == 2) {
			# add new items
			if ($_ == 0) {
				$last_index = $seq13_2[0];
				foreach $data_index (0..$last_index-1) {
					push @result, $list3[$data_index];
				}
			} elsif ($_ == $#seq2) {
				$first_index = $seq13_2[$_ / 2 - 1];
				foreach $data_index ($first_index+1..$#list3) {
					push @result, $list3[$data_index];
				}
			} else {
				$first_index = $seq13_2[$_ / 2 - 1];
				$last_index = $seq13_2[$_ / 2];
				print "--$_\n";
				foreach $data_index ($first_index+1..$last_index-1) {
					push @result, $list3[$data_index];
				}
			}
		}
	}
	print "@result\n";
}


($file1, $file2, $file3) = @ARGV;

# file 1 is the base one
# file 2 is the b1 branch
# file 3 is the master branch


open IN, '<', "$file1" or die "cannot open $file1\n";
while (<IN>) {
	chomp;
	push @file1, $_;
}
close IN;

open IN, '<', "$file2" or die "cannot open $file2\n";
while (<IN>) {
	chomp;
	push @file2, $_;
}
close IN;

open IN, '<', "$file3" or die "cannot open $file3\n";
while (<IN>) {
	chomp;
	push @file3, $_;
}
close IN;

# testing
@r12 = &find_lcs(\@file1, \@file2);
@r13 = &find_lcs(\@file1, \@file3);
# print "@r12\n";
# print "@r13\n";
($ref_res12, $ref_seq12_1, $ref_seq12_2) = find_seq(\@file1, \@file2, \@r12);
($ref_res13, $ref_seq13_1, $ref_seq13_2) = find_seq(\@file1, \@file3, \@r13);
@res12 = @$ref_res12;
@res13 = @$ref_res13;
@seq12_1 = @$ref_seq12_1;
@seq12_2 = @$ref_seq12_2;
@seq13_1 = @$ref_seq13_1;
@seq13_2 = @$ref_seq13_2;
# print "---@res12\n";
# print "---@res13\n";
# print "---@seq12_1\n";
# print "---@seq12_2\n";
# print "---@seq13_1\n";
# print "---@seq13_2\n";
$pattern_res = analyse_seqs(\@res12, \@res13);
# print "$pattern_res\n";
# print "^^^@res12\n";
# print "^^^@res13\n";
get_merge_file(\@file1, \@file2, \@file3, \@res12, \@res13, \@seq12_1, \@seq12_2, \@seq13_1, \@seq13_2) if $pattern_res == 0;
