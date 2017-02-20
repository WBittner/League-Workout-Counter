/**
 *  Factory to return the LoL rest call options
 */

const CONSTANTS = require("./Constants.js");

const restMethodGET = {
    method: "GET"
};

const responseTypeJSON = {
    json: true
}

module.exports = {

    getChampionInfoOptions: function(championId) {
        return Object.assign({
                uri: CONSTANTS.URLS.CHAMPION.replace("%s",championId)
            },
            restMethodGET,
            responseTypeJSON);
    },

    getMatchHistoryOptions: function(summonerId) {
        return Object.assign({
                uri: CONSTANTS.URLS.GAME.replace("%s",summonerId)
            },
            restMethodGET,
            responseTypeJSON);
    },

    getSummonerIdOptions: function(summonerName) {
        return Object.assign({
                uri: CONSTANTS.URLS.SUMMONER.replace("%s",summonerName)
            },
            restMethodGET,
            responseTypeJSON);
    }
};