function countStats(data) {
	let matches = 0;
	let tries = 0;
	for (const each of data) {
		matches += parseInt(each["matches"]);
		tries += parseInt(each["tries"]);
	}
	return {
		"matches": matches,
		"tries": tries
	};
}

const json = process.argv[2];
if (json === undefined) {
    throw new Error(`input not supplied`);
}
// include the json file via node's module system,
// this parses the json file into a JS object
// NOTE: this only works via node and will not work in the browser
const stats = require(`./${json}`);

console.log(countStats(stats.results));
