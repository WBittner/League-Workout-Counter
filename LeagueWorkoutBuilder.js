/*
*
*	Entry point into workout building code.
*
*/

//const constants = require("./Constants.js");
const summonerIDGetter = require("./GetSummonerId.js");

module.exports = function (req, res) //this takes in nodeJS request and response as it will be directly called from app.get
{
	const summonerName = req.params.userName.toLowerCase(); //toLowerCase...rip half hour of my life.

	//temp callback for testing summonerIDGetter functionality
	var summonerNameCallback = function(id, URL)
	{
		if(id!=-1)
			res.send("Success: Received username: " + req.params.userName + ", ID: " + id );
		else 
			res.send("Error on backend: " + URL + ". Id: " + id);
	};

	// Take user name and turn it into summoner ID
	summonerIDGetter(summonerName, summonerNameCallback);

	// Use summoner name to get match history

	// Use match history to make a workout :)
	

	//res.send to send a response 
	//res.send("Received username: " + req.params.userName + ", ID: " + "uh..");
}