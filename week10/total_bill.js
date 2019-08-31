function total_bill(bill_list) {

  // PUT YOUR CODE HERE
	let cnt = 0;
	for (const each_outer of bill_list) {
		for (const each_inner of each_outer) {
			cnt += parseFloat(each_inner["price"].slice(1));
		}
	}
	return cnt;

}

module.exports = total_bill;
