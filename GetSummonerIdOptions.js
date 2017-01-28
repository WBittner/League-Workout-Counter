/*
*
*	GetSummonerIdOptions.js - wrapper for Riot Games API to use a League of Legends summoner name to get their summoner ID
*
*/
const constants = require("./Constants.js");

module.exports = function(summonerName)
{
	const options = 
	{
		method: 'GET',
		uri: constants.URLS.SUMMONER.replace("%s",summonerName)
	}

	return options;
}