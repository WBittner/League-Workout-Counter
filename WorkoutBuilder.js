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

	//Build the workout!!
	const workout = buildWorkout(KDAs);

	const returnObj = {workout: workout, KDAs:KDAs};

	return returnObj;
}

const WORKOUT_MODIFIER_ENUM = 
{
	DEATHS: 5, KILLS: -2, ASSISTS: -1
}

function buildWorkout(KDAs)
{
	//For right now, we will just use a base calculation and apply it to crunches/pushups. 
	// Enhancement will be to add an options param to allow for other workouts (running/walking) and different difficulties
	var workout = {};
	var pushups = {name: "Pushups", count:0};
	var crunches = {name: "Crunches", count:0};
	workout.pushups = pushups;
	workout.crunches = crunches;

	//handle most recent game differently, as it should weigh the most - no sense in overpunishing one bad game in a day.
	const lastGame = KDAs.lastGame;
	var lastGameWorkoutCount = (lastGame.K * WORKOUT_MODIFIER_ENUM.KILLS) + (lastGame.D * WORKOUT_MODIFIER_ENUM.DEATHS) + (lastGame.A * WORKOUT_MODIFIER_ENUM.ASSISTS);
	workout.pushups.count += lastGameWorkoutCount;
	workout.crunches.count += lastGameWorkoutCount;

	//only count crunches in the rest of the games
	const remainingGames = KDAs.remainingGames;
	var remainingGamesWorkoutCount = (remainingGames.K * WORKOUT_MODIFIER_ENUM.KILLS) + (remainingGames.D * WORKOUT_MODIFIER_ENUM.DEATHS) + (remainingGames.A * WORKOUT_MODIFIER_ENUM.ASSISTS);
	//No reducing the count based on previous games!
	remainingGamesWorkoutCount = remainingGamesWorkoutCount > 0 ? remainingGamesWorkoutCount : 0;
	workout.crunches.count += remainingGamesWorkoutCount;

	return workout;
}


function getKDAs(games)
{
	//Return KDAs from the last game and the summation KDA of all games lost
	var KDAs = {};

	const lastGameStats = games.pop().stats; //games we added to the array from oldest to newest, so popping will give us the most recently played game
	KDAs.lastGame = {};
	KDAs.lastGame.K = lastGameStats.championsKilled;
	KDAs.lastGame.D = lastGameStats.numDeaths;
	KDAs.lastGame.A = lastGameStats.assists;

	KDAs.remainingGames = {};
	KDAs.remainingGames.K = 0;
	KDAs.remainingGames.D = 0;
	KDAs.remainingGames.A = 0;

	for(var i = 0; i < games.length; i++)
	{
		var gameStats = games[i].stats;
		if(gameStats.win == false)
		{
			KDAs.remainingGames.K += gameStats.championsKilled;
			KDAs.remainingGames.D += gameStats.numDeaths;
			KDAs.remainingGames.A += gameStats.assists;
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