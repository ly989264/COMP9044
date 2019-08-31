(function() {
  'use strict';
  // TODO: Write some js
  	const info_items = document.getElementsByClassName("info-item");
	for (const each of info_items) {
    	each.getElementsByClassName("tool-bar")[0].getElementsByClassName("expand-collapse-btn")[0].getElementsByTagName("i")[0].addEventListener("click", (event) => {
			if (each.getElementsByClassName("content")[0].getAttribute("hidden") !== 'true') {
				each.getElementsByClassName("tool-bar")[0].getElementsByClassName("expand-collapse-btn")[0].getElementsByTagName("i")[0].innerText="expand_more";
				each.getElementsByClassName("content")[0].setAttribute("hidden", true);
	        } else {
				each.getElementsByClassName("tool-bar")[0].getElementsByClassName("expand-collapse-btn")[0].getElementsByTagName("i")[0].innerText="expand_less";
				each.getElementsByClassName("content")[0].removeAttribute("hidden");
	        }
	    });
	}
}());
