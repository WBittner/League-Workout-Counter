/**
 *  Takes a match history object from LoL API and transforms it into just want I need to calculate a workout (KDAs)
 */

module.exports = {
    transformLeagueStats: function(matchHistoryObject) {
        return extractStats(extractTodaysGames(matchHistoryObject));
    }
};

function extractTodaysGames(matchHistoryObject) {
    const lastGameDateString = new Date(matchHistoryObject.games[0].createDate).toDateString();
    let todaysGames = [];

    matchHistoryObject.games.forEach(function(value, index, array) {
        if(new Date(value.createDate).toDateString() === lastGameDateString) {
            todaysGames.push(value);
        }
    });

    return todaysGames;
}

function extractStats(todaysGames) {
    let lastGame = todaysGames.shift();
    let stats = {
        Won: lastGame.stats.win,
        KDAs: {
            lastGameKDA: {
                Kills: lastGame.stats.championsKilled || 0,
                Deaths: lastGame.stats.numDeaths || 0,
                Assists: lastGame.stats.assists || 0
            },
            totalKDA: {
                Kills: lastGame.stats.championsKilled || 0,
                Deaths: lastGame.stats.numDeaths || 0,
                Assists: lastGame.stats.assists || 0
            }
        }
    };

    todaysGames.forEach(function(value, index, array) {
        stats.KDAs.totalKDA.Kills += value.stats.championsKilled || 0;
        stats.KDAs.totalKDA.Deaths += value.stats.numDeaths || 0;
        stats.KDAs.totalKDA.Assists += value.stats.assists || 0;
    });

    return stats;
}