function sum(list) {

  // PUT YOUR CODE HERE
	let res = 0;
	for (const each of list) {
		res += parseInt(each);
	}
	return res;

}

module.exports = sum;
