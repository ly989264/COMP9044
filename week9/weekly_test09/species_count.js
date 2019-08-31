function species_count(target_species, whale_list) {

  // PUT YOUR CODE HERE
	let res = 0;
	for (const each_obj of whale_list) {
		if (each_obj["species"] === target_species) {
			res = res + parseInt(each_obj["how_many"]);
		}
	}
	return res;

}

module.exports = species_count;
