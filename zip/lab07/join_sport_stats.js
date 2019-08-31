function makeTeamList(teamData, namesData, teamsData) {
	let result = [];
	const team_id = teamData["team"]["id"];
	let team_name = null;
	for (const each of teamsData) {
		if (each["id"] === team_id) {
			team_name = each["team"];
		}
	}
	result.push(team_name+", coached by "+teamData["team"]["coach"]);
	teamData["players"].sort((a,b) => parseInt(b["matches"]) - parseInt(a["matches"]));
	let cnt = 1;
	for (const each of teamData["players"]) {
		let player_id = each["id"];
		let player_name = null;
		for (const each_name_pair of namesData) {
			if (each_name_pair["id"] === player_id) {
				player_name = each_name_pair["name"];
			}
		}
		result.push(cnt+". "+player_name);
		cnt++;
	}
	return result;
}

const teamJson = process.argv[2];
const namesJson = process.argv[3];
const teamsJson = process.argv[4];
if (teamJson === undefined || namesJson === undefined || teamsJson === undefined) {
  throw new Error(`input not supplied`);
}

// some sample data
const team  = require(`./${teamJson}`);
const names  = require(`./${namesJson}`);
const teams  = require(`./${teamsJson}`);
console.log(makeTeamList(team, names.names, teams.teams));
