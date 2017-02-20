/*
*
*	LeagueWorkoutBuilder.js - Entry point into workout building code.
*
*/

const leagueStatsGetter = require("./LeagueStatsGetter");
const workoutBuilder = require("./WorkoutBuilder.js");

module.exports = function(req, res) //this takes in nodeJS request and response as it will be directly called from app.get and will be directly outputting to frontend
{
	leagueStatsGetter.getMatchHistoryWithIconFromSummonerName(req.params.userName)
		.then(workoutBuilder)
		.then(res.send.bind(res))
        .catch(function(error)
        {
            res.send({error:true, value: error});
        });
}