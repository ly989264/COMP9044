#!/usr/bin/perl -w

@nums = ();

for (@ARGV) {
	push @nums, $_;
}

@new = sort{$a <=> $b} (@nums);

print $new[$#new/2], "\n";
