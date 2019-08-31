(function() {
   'use strict';
   // write your code here
	const h2_element = document.getElementById("main").getElementsByTagName("h2")[0];
	const update_time = () => {
		const time = new Date();
		h2_element.innerText = time;
	};
	setInterval(update_time, 1000);
}());
