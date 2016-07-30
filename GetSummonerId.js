/*
*
*	GetSummonerId.js - wrapper for Riot Games API to use a League of Legends summoner name to get their summoner ID
*
*/
const constants = require("./Constants.js");
const rp = require("request-promise");

module.exports = function(summonerName, callback)
{
	const options = 
	{
		method: 'GET',
		uri: constants.URL_BASE + constants.VERSIONS.SUMMONER + constants.SUMMONER_URL + summonerName + constants.API_KEY_URL_FORMATTED
	}
	var id;

	rp(options)
	.then(function(response) 
	{
    	const jsonBody = JSON.parse(response);
    	id = jsonBody[summonerName].id;
	})
	.catch(function(error)
	{	
		id = -1;
	})
	.finally(function()
	{
		callback(id);
	});
}