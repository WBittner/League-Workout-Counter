/*
*
*	LeagueWorkoutBuilder.js - Entry point into workout building code.
*
*/

const rp = require("request-promise");
const summonerIDOptionsGetter = require("./GetSummonerIdOptions.js");
const matchHistoryOptionsGetter = require("./GetMatchHistoryOptions.js");
const workoutBuilder = require("./WorkoutBuilder.js");

module.exports = function(req, res) //this takes in nodeJS request and response as it will be directly called from app.get and will be directly outputting to frontend
{
	const summonerName = req.params.userName.toLowerCase(); //toLowerCase...rip half hour of my life.

	// Construct initial request options. The rest will be constructed in the chain.
	const summonerIDOptions = summonerIDOptionsGetter(summonerName);
	

	// Chain requests to start with summoner name and end with a match history json!
	rp(summonerIDOptions)
	.then(function(response)//summonerID passed
	{
    	const jsonSummoner = JSON.parse(response);
    	const id = jsonSummoner[summonerName].id;

    	var matchHistoryOptions = matchHistoryOptionsGetter(id);

    	//call match history with summoner id
    	rp(matchHistoryOptions)
    	.then(function(response)//matchHistory passed
    	{
    		const jsonMatchHistory = JSON.parse(response);

			// Use match history to make a workout :)
    		const workout = workoutBuilder(jsonMatchHistory);
    		res.send(workout);
    	})
    	.catch(function(error)//matchHistory failed ):
    	{
			console.log("Error on mh: ", error);

    		res.send({error:true});
    	})
	})
	.catch(function(error)//summonerID failed ):
	{	
		console.log("Error on sid: ", error);

		res.send({error:true});
	})
}