export default function runApp() {
	const url = "https://jsonplaceholder.typicode.com/users";
	const output_div = document.getElementById("output");
	const xhr = new XMLHttpRequest();
	console.log("here");
	xhr.open("GET", url, false);
	xhr.onload = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				const result_obj = JSON.parse(xhr.responseText);
				for (const each_obj of result_obj) {
					const temp_div = document.createElement("div");
					temp_div.classList.add("user");
					output_div.appendChild(temp_div);
					const username_h3 = document.createElement("h3");
					username_h3.innerText = each_obj["name"];
					temp_div.appendChild(username_h3);
					const companyCatchPhrase = document.createElement("p");
					companyCatchPhrase.innerText = each_obj["company"]["catchPhrase"];
					temp_div.appendChild(companyCatchPhrase);
				}
			}
		}
	};
	xhr.send(null);
}
