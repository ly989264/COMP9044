#!/usr/bin/perl -w

#$perl = '$answer = 6 * 7;';
#eval $perl;
#print "$answer\n";

@arr = (0,1,2,3,4,5,6,7,8,9);
%has = ();
push @arr, 10;
$len = @arr;
print "$len\n";
print scalar @arr, "\n";
print @arr[@arr[0..5]],"\n";
print substr("aer", 2), "\n";
$has{1} = '1';
foreach (keys %has) {
	print "$_, $has{$_}\n";
}

$res = `ls -l`;
print "$res\n";
$str = "hola";
@str_arr = split(//, $str);
print scalar @str_arr, "\n";
print length($str), "\n";
print $str x 3, "\n";
print rand(5), "\n";
print chr(97), "\n";
print ord("ahola"), "\n";
print index("hola", "olb"), "\n";
@sorted = sort{ length($b) <=> length($a) || $b * $b <=> $a * $a } @arr;
print "@sorted\n";
