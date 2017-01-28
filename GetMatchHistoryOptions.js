/*
*
*	GetMatchHistoryOptions.js - wrapper for Riot Games API to use a League of Legends summoner ID to get their match history
*
*/
const constants = require("./Constants.js");

module.exports = function(summonerID)
{
	const options = 
	{
		method: 'GET',
		uri: constants.URLS.GAME.replace("%s",summonerID)
	}

	return options;
}