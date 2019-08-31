(function() {
   'use strict';
   // write your js here.
	const output_element = document.getElementById("output");
	let hide_flag = true;
	const update_hide_status = () => {
		if (hide_flag === true) {
			output_element.classList.remove("hide");
			hide_flag = false;
		} else {
			output_element.classList.add("hide");
			hide_flag = true;
		}
	};
	setInterval(update_hide_status, 2000);
}());
