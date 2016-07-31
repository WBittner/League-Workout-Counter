/*
*
*	WorkoutBuilder.js - This file will take in a match history and build a workout from it.
*
*/
module.exports = function(matchHistoryJSON)
{
	const todaysGames = getTodaysGames(matchHistoryJSON);

	return todaysGames;
}


function getTodaysGames(matchHistoryJSON)
{
	//Assuming first slot in games array is the most recent, until further research/testing can be done ;)
	// Find date of most recent match, then grab each match whose date is the same.

	const games = matchHistoryJSON.games;
	const dateOfLastMatch = new Date(games[0].createDate);
	var todaysGames = [];
	for(var i = 0; i < games.length; i++)
	{
		var game = games[i];
		var tempDate = new Date(game.createDate);
		if(dateOfLastMatch.toDateString() == tempDate.toDateString()) //toDateString() gives day, month, year
		{
			todaysGames.push(game);
		}
	}
	return todaysGames;
}