export default function runApp() { 
	const img = document.getElementById("cat");
	const worker = new Worker("worker.js");
		worker.onmessage = (event) => {
			img.setAttribute("src", event.data);
		};
	setInterval( () => {
		const worker = new Worker("worker.js");
		worker.onmessage = (event) => {
			img.setAttribute("src", event.data);
		};
	}, 5000);	
}
