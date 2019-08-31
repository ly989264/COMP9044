export default function runApp() {
	const information_div = document.getElementById("information");
	const information_h2 = information_div.getElementsByTagName("h2")[0];
	const information_p = information_div.getElementsByTagName("p")[0];
	const information_ul = information_div.getElementsByTagName("ul")[0];
	const nav_tabs_ul = document.getElementsByClassName("nav-tabs")[0];
	const nav_links = document.getElementsByClassName("nav-link");
	for (const each of nav_links) {
		each.addEventListener("click", (event) => {
			const planet = event.target.innerText;
			for (const each_li of nav_tabs_ul.getElementsByTagName("li")) {
				if (each_li.firstElementChild.classList.contains("active")) {
					each_li.firstElementChild.classList.remove("active");
					break;
				}
			}
			while (information_ul.getElementsByTagName("li").length > 0) {
				information_ul.removeChild(information_ul.getElementsByTagName("li")[0]);
			}
			event.target.classList.add("active");
			fetch('./planets.json')
				.then(r => r.json())
				.then(r => {
					for (const each_obj of r) {
						if (each_obj["name"] === planet) {
							information_h2.innerText = planet;
							information_p.innerText = each_obj["details"];
							for (const each_property in each_obj["summary"]) {
								const information_li = document.createElement("li");
								const information_li_b = document.createElement("b");
								information_li_b.innerText = each_property;
								information_li.appendChild(information_li_b);
								const information_li_text = document.createTextNode(each_obj["summary"][each_property]);
								information_li.appendChild(information_li_text);
								information_ul.appendChild(information_li);
							}
							break;
						}
					}
				});
		});
	}		
}
