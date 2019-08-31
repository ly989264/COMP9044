(function() {
	const info_items = document.getElementsByClassName("info-item");
	for (const each of info_items) {
		each.getElementsByClassName("tool-bar")[0].getElementsByClassName("expand-collapse-btn")[0].getElementsByTagName("i")[0].addEventListener("click", () => {
			each.getElementsByClassName("content")[0].setAttribute("hidden", true);
		});
	}
}());
