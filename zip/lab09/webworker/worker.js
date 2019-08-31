// your web worker goes here.
const url = "https://api.thecatapi.com/v1/images/search?&mime_type=image/gif"
fetch(url)
	.then(r => r.json())
	.then(r => {
		self.postMessage(r[0]["url"]);
	});


