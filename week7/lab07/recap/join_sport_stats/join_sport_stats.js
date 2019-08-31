function makeTeamList(teamData, namesData, teamsData) {
	// Take it step by step.
	let res = [];
	res.push(teamsData[0]["team"]+", coached by"+teamData["team"]["coach"]);
	teamData["players"].sort((a,b) => parseInt(b["matches"]) - parseInt(a["matches"]));
	let cnt = 1;
	for (const each of teamData["players"]) {
		for (const inner of namesData) {
			if (inner["id"] === each["id"]) {
				res.push(cnt+". "+inner["name"]);
				cnt++;
			}
		}
	}
	return res;
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
