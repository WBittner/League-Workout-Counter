/*
*
*	Entry point into workout building code.
*
*/

//const constants = require("./Constants.js");
const rp = require("request-promise");
const summonerIDOptionsGetter = require("./GetSummonerIdOptions.js");
const matchHistoryOptionsGetter = require("./GetMatchHistoryOptions.js");

module.exports = function (req, res) //this takes in nodeJS request and response as it will be directly called from app.get and will be directly outputting to frontend
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
    		res.send(jsonMatchHistory);
    	})
    	.catch(function(error)//matchHistory failed ):
    	{
			console.log("Error on mh...");
			console.log(error);

    		res.send({error:true});
    	})
	})
	.catch(function(error)//summonerID failed ):
	{	
		console.log("Error on sid...");
		console.log(error);

		res.send({error:true});
	})


	// Use match history to make a workout :)
	

	//res.send to send a response 
	//res.send("Received username: " + req.params.userName + ", ID: " + "uh..");
}