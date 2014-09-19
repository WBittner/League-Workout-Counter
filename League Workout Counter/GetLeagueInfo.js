/**
 * Javascript to access League of Legends API
 * Written by William Bittner
 */

var key = "?api_key=6664f4db-4da8-4d3b-a858-20dc58175f06";
var region = "na/";
var version = "v1.4/"
var summonerName = "";
var id = 0;
var urlBase = "https://na.api.pvp.net/"
var moreBase = "api/lol/";
var numDeaths = 0;
var numKills = 0;
var numAssists = 0;
	
function getLeagueInfo()
{
	summonerName = "si1v3r";

	var fullURL = urlBase + moreBase+ region + version + "summoner/by-name/" 
	+ summonerName + key;
	//access API for summoner info 
	
	
	var client = new XMLHttpRequest();
	client.open("GET", fullURL, false);
	client.send();
	
	
	if(client.status==200){
		//get id
		var strJSON = client.responseText;
		//document.getElementById("text").innerHTML = strJSON;
		var temp = JSON.parse(strJSON);
		id = temp.si1v3r.id;
		
		var mhURL = "https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/28901069/recent?api_key=6664f4db-4da8-4d3b-a858-20dc58175f06";
		
		//use ID for match history
		client.open("GET", mhURL, false);
		client.send();
		strJSON = client.responseText;
		temp = JSON.parse(strJSON);
		
			
		numDeaths =temp.games[0].stats.numDeaths;
		numKills =temp.games[0].stats.championsKilled;
		numAssists =temp.games[0].stats.assists;
				
				
		document.getElementById("text").innerHTML = ("Num kills: " +numKills +"\nNum deaths:" +
				numDeaths + "\nNum assists: " + numAssists);
	}
	else
		document.getElementById("text").innerHTML = nope;
	
}