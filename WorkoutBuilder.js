/*
*
*	WorkoutBuilder.js - This file will take in a match history and build a workout from it.
*
*/
module.exports = function(matchHistoryJSON)
{
	//Grab all the games from the day of the last match
	const todaysGames = getTodaysGames(matchHistoryJSON);

	//Get the KDA of last game and KDA of toadays losses.
	const KDAs = getKDAs(todaysGames);

	return KDAs;
}

function getKDAs(games)
{
	//Return KDAs from the last game and the summation KDA of all games lost
	var KDAs = {};

	const lastGameStats = games.pop().stats; //games we added to the array from oldest to newest, so popping will give us the most recently played game
	KDAs.lastGame = {};
	KDAs.lastGame.won = lastGameStats.win;
	KDAs.lastGame.K = lastGameStats.championsKilled;
	KDAs.lastGame.D = lastGameStats.numDeaths;
	KDAs.lastGame.A = lastGameStats.assists;

	KDAs.otherGames = {};
	KDAs.otherGames.K = 0;
	KDAs.otherGames.D = 0;
	KDAs.otherGames.A = 0;

	for(var i = 0; i < games.length; i++)
	{
		var gameStats = games[i].stats;
		if(gameStats.win == false)
		{
			KDAs.otherGames.K += gameStats.championsKilled;
			KDAs.otherGames.D += gameStats.numDeaths;
			KDAs.otherGames.A += gameStats.assists;
		}
	}

	return KDAs;
}

function getTodaysGames(matchHistoryJSON)
{
	//Assuming first slot in games array is the most recent, until further research/testing can be done ;)
	// Find date of most recent match, then grab each match whose date is the same.

	const games = matchHistoryJSON.games;
	const dateOfLastMatch = new Date(games[0].createDate);
	var todaysGames = [];
	for(var i = games.length-1; i >= 0; i--)
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