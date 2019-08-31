/*
 * Fill out the Person prototype
 * function "buyDrink" which given a drink object which looks like:
 * {
 *     name: "beer",
 *     cost: 8.50,
 *     alcohol: true
 * }
 * will add the cost to the person expences if the person
 * is
 *    1. old enough to drink (if the drink is alcohol)
 *    2. buying the drink will not push their tab over $1000
 *
 * in addition write a function "getReceipt" which returns a list as such
 * [
 *    {
 *        name: beer,
 *        count: 3,
 *        cost: 25.50
 *    }
 * ]
 *
 * which summaries all drinks a person bought by name in order
 * of when they were bought (duplicate buys are stacked)
 *
 * run with `node objects.js <name> <age> <drinks file>`
 * i.e
 * `node v.js alex 76 drinks.json`
 */

function Person(name, age) {
    this.name = name;
    this.age = age;
    this.tab = 0;
    this.history = {};
    this.historyLen = 0;
    this.canDrink = function() {
      return this.age >= 18;
    };
    this.canSpend = function(cost) {
      return this.tab + cost <= 1000;
    }
}

// write me
Person.prototype.buyDrink = function(drink) {
	if (drink["alcohol"]) {
		if (this.canDrink() && this.canSpend(parseFloat(drink["cost"]))) {
			this.tab += parseFloat(drink["cost"]);
			if (this.history[drink["name"]] === undefined) {
				this.history[drink["name"]] = {
					"amount": 1,
					"price": drink["cost"]
				};
			} else {
				this.history[drink["name"]]["amount"]++;
			}
		}
	} else {
		if (this.canSpend(parseFloat(drink["cost"]))) {
			this.tab += parseFloat(drink["cost"]);
			if (this.history[drink["name"]] === undefined) {
				this.history[drink["name"]] = {
					"amount": 1,
					"price": drink["cost"]
				};
			} else {
				this.history[drink["name"]]["amount"]++;
			}
		}
	}
}
// write me
Person.prototype.getReceipt = function() {
	let res_arr = [];
	for (const each in this.history) {
		// each is the key
		res_arr.push({
			name: each,
			count: this.history[each]["amount"],
			total: this.history[each]["amount"]*this.history[each]["price"]
		});
	}
	return res_arr;
}


const name = process.argv[2];
const age = parseInt(process.argv[3]);
const drinksJson = process.argv[4]
if (name === undefined || age === undefined || drinksJson === undefined) {
  throw new Error(`input not supplied`);
}
const drinks = require(`./${drinksJson}`);
const p = new Person(name, age);
for (let drink of drinks) {
  p.buyDrink(drink)
}
console.log(p.getReceipt());


