function buildPipe() {
	let result = (a) => {
		for (let index = 0; index < arguments.length; index++) {
			a = arguments[index](a);
		}
		return a;
	}
	return result;
}

// This is how we can export functions in node
// in the same way we can use the "export" keyword in browser 
// side JS
module.exports = buildPipe;
