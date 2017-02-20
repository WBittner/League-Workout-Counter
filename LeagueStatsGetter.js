/**
 *  Functions related to using the LoL api to get match stats
 */

const rp = require("request-promise");

const restCallFactory = require("./RestCallFactory");
const CONSTANTS = require("./Constants");


function getSummonerId(summonerName) {
    return rp(restCallFactory.getSummonerIdOptions(summonerName))
        .then(function(data) {
            return data[summonerName.toLowerCase()].id;
        });
}

function getMatchHistoryFromSummonerId(summonerId) {
    return rp(restCallFactory.getMatchHistoryOptions(summonerId))
        .then(function(data) {
            return data;
        });
}

function appendChampionIconURLToMatchHistory(matchHistory) {
    return rp(restCallFactory.getChampionInfoOptions(matchHistory.games[0].championId))
        .then(function(data) {
            matchHistory.championIconURL = CONSTANTS.URLS.DDIcon.replace("%s", data.key);
            return matchHistory;
        });
}

module.exports.getMatchHistoryWithIconFromSummonerName = function(summonerName) {
    return getSummonerId(summonerName)
        .then(getMatchHistoryFromSummonerId)
        .then(appendChampionIconURLToMatchHistory);
}
