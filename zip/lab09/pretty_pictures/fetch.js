export default function runApp() {
	const output_div = document.getElementById("output");
	const url = "https://picsum.photos/200/300/?random";
	const more_button = document.getElementById("more");
	more_button.addEventListener("click", () => {
		while (output_div.getElementsByClassName("img-post").length > 0) {
			output_div.removeChild(output_div.getElementsByClassName("img-post")[0]);
		}
		const img_div = document.createElement("div");
		const img = document.createElement("img");
		const img_p = document.createElement("p");
		img_p.innerText = "Fetching...";
		output_div.appendChild(img_div);
		img_div.appendChild(img);
		img_div.appendChild(img_p);
		fetch(url)
			.then(r => {
				fetch(r["url"])
					.then(r => r.arrayBuffer())
					.then(r => {
						const base64Flag = "data:image/jpeg;base64, ";
						let binary = "";
						let bytes = [].slice.call(new Uint8Array(r));
						bytes.forEach((b) => binary += String.fromCharCode(b));
						const imageStr = window.btoa(binary);
						img_div.classList.add("img-post");
						img.setAttribute("src", base64Flag+imageStr);
						const d = new Date();
						img_p.innerText = "Fetched at " + d.getHours()+":"+(d.getMinutes() < 10 ? "0"+d.getMinutes() : d.getMinutes());
					});
			});
	});	

}
