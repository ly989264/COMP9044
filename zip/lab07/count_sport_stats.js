function countStats(data) {
    const get_value = a => b => b[a];
    const sum = (a, b) => +a + +b;
    const matches_res = data.map(get_value("matches")).reduce(sum, 0);
    const tries_res = data.map(get_value("tries")).reduce(sum, 0);
    const new_obj = {
	matches: matches_res,
	tries: tries_res
    }
    return new_obj;
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
