/*
*	LeagueWorkoutBuilder.js - Entry point into workout building code.
*/

const getMatchHistoryWithIconFromSummonerName = require("./LeagueStatsGetter").getMatchHistoryWithIconFromSummonerName;
const transformLeagueStats = require("./LeagueStatsTransformer").transformLeagueStats;
const getWorkoutFactory = require("./WorkoutCalculatorFactory").getWorkoutFactory;

module.exports =  {
    buildLeagueWorkout(req, res) {
        getMatchHistoryWithIconFromSummonerName(req.params.userName)
            .then(function(matchHistoryWithIconFromSummonerName) {
                let response = {
                    championIconURL: matchHistoryWithIconFromSummonerName.championIconURL,
                    stats: transformLeagueStats(matchHistoryWithIconFromSummonerName)
                };

                response.workout = getWorkoutFactory(JSON.parse(req.params.workout)).calculateWorkout(response.stats.KDAs);

                return response;
            })
            .then(res.send.bind(res))
            .catch(function(error)
            {
                console.log(error);
                res.send({error:true, value: error});
            });
    }
};