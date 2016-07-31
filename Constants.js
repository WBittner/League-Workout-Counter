/*
*
*	Constant.js - defined constants for use through out the codebase.
*
*/
var constants = {};

constants.API_KEY = "6664f4db-4da8-4d3b-a858-20dc58175f06";

constants.VERSIONS = {};
constants.VERSIONS.SUMMONER = "v1.4";
constants.VERSIONS.GAME = "v1.3";

constants.URLS = {};
constants.URLS.BASE = "https://na.api.pvp.net/api/lol/na/";
constants.URLS.API_KEY = "?api_key=" + constants.API_KEY;
constants.URLS.ENDPOINTS = {};
constants.URLS.ENDPOINTS.SUMMONER = "summoner/by-name/";
constants.URLS.ENDPOINTS.GAME = "game/by-summoner/";
constants.URLS.SUMMONER = constants.URLS.BASE + constants.VERSIONS.SUMMONER + "/" + constants.URLS.ENDPOINTS.SUMMONER + "%s" + constants.URLS.API_KEY;
constants.URLS.GAME = constants.URLS.BASE + constants.VERSIONS.GAME + "/" + constants.URLS.ENDPOINTS.GAME + "%s/recent" + constants.URLS.API_KEY;



module.exports = constants;