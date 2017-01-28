/*
*
*	GetChampionInfoOptions.js - wrapper for Riot Games API to use a League of Legends champion id to get the champion info
*
*/
const constants = require("./Constants.js");

module.exports = function(championId)
{
	const options = 
	{
		method: 'GET',
		uri: constants.URLS.CHAMPION.replace("%s",championId)
	}

	return options;
}