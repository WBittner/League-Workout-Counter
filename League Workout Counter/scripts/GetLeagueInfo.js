/** 
 * Javascript to access League of Legends API
 * Written by William Bittner
 */

var key = "?api_key=6664f4db-4da8-4d3b-a858-20dc58175f06";
var region = "na/";
var version = "v1.4/";
var mhversion = "v1.3/";
var summonerName = "";
var id = 0;
var urlBase = "https://na.api.pvp.net/";
var moreBase = "api/lol/";
var mh = "";
var numDeaths = 0;
var numKills = 0;
var numAssists = 0;
var win = true;
var champID = 0;
var date;
var prevCrunches;
	


function initForm()
{
	//set onclick for the buttons to display 
	document.getElementById("soft").setAttribute("onclick", "adjustButtons(this);getLeagueInfo();displayInfo(3,2,1)");
	document.getElementById("med").setAttribute("onclick", "adjustButtons(this);getLeagueInfo();displayInfo(5,2,1)");
	document.getElementById("hard").setAttribute("onclick", "adjustButtons(this);getLeagueInfo();displayInfo(5,1,1)");
	
	//set enter to auto click med
	document.onkeypress = processKey;
	function processKey(e)
	{
	    if (null == e)
	        e = window.event ;
	    if (e.keyCode == 13)  {
	        document.getElementById("med").click(); 	    }
	}
}//end init

//changes class of button to change color through css so you know which one you picked
function adjustButtons(button)
{
	var array = document.getElementsByTagName("input");
	for(var s = 0; s<array.length; s++)
		if(array[s].type == "button")
			array[s].setAttribute("class","button");
	button.setAttribute("class","clickedButton");
}//end adjustButtons

function getLeagueInfo()
{
	summonerName = document.getElementById("summonerName").value;
	
	var fullURL = urlBase + moreBase+ region + version + "summoner/by-name/" + summonerName + key;
	//access API for summoner info 
	
	
	var client = new XMLHttpRequest();
	client.open("GET", fullURL, false);
	client.send();
	
	
	if(client.status==200){
		//get id
		var strJSON = client.responseText;
		//change string so we can find stuff - cant change summoner name D:
		strJSON = fixJSONString(strJSON);
		
		var temp = JSON.parse(strJSON);
		id = temp.ThisRightHereSummonerName.id;
		

		
		//use ID for match history
		mhURL = urlBase + moreBase + region + mhversion + "game/by-summoner/" + id + "/recent" + key;
		client.open("GET", mhURL, false);
		client.send();
		strJSON = client.responseText;
		temp = JSON.parse(strJSON);
		
		//use json to parse through and get stats
		numDeaths =temp.games[0].stats.numDeaths;
		numKills =temp.games[0].stats.championsKilled;
		numAssists =temp.games[0].stats.assists;
		win = temp.games[0].stats.win;
		champID = temp.games[0].championId;		
		date = EMtoMD(temp.games[0].createDate);
		
	}
	else//incase the API status is bad
		document.getElementById("text").innerHTML = nope;
	

	if(numDeaths === undefined)
		numKills = 0;
	if(numKills === undefined)
		numKills = 0;
	if(numAssists === undefined)
		numKills = 0;
	
	//display pic of most recent games champ
	displayChamp(champID);
}//end getLeagueInfo

//edits the JSON string so that I can parse it for all summoners, not just those that I know the summoner name of
//by changing their name to "ThisRightHereSummonerName" - something i dont expect to find anywhere else
function fixJSONString(string)
{
	var temp = string;
	var start = temp.indexOf('"')+1;
	temp = temp.substring(start);
	var end = temp.indexOf('"');
	temp = temp.substring(0,end);
	temp = string.substring(0,start) + "ThisRightHereSummonerName" + string.substring(end+start);
	
	return temp;
}//end fixJSONString

//checks for any previous games on the same day, then adds their total crunches to the variable prevCrunches recursively
function checkPreviousGames(prevGameTotal,dmod,kmod,amod)
{
	var mhclient = new XMLHttpRequest();
	mhclient.open("GET", mhURL, false);
	mhclient.send();
	var strJSON2 = mhclient.responseText;
	var temp = JSON.parse(strJSON2);
	var gameDate = EMtoMD(temp.games[prevGameTotal].createDate);

	//base case - if the date doesn't equal the most recent games date we're done!
	if(date!=gameDate)
		return 0;
	else
	{
		if(temp.games[prevGameTotal].stats.win==false)
		{		
			var tnumDeaths = 0;
			var tnumKills = 0;
			var tnumAssists = 0;
			tnumDeaths =temp.games[prevGameTotal].stats.numDeaths;
			tnumKills =temp.games[prevGameTotal].stats.championsKilled;
			tnumAssists =temp.games[prevGameTotal].stats.assists;

			if(tnumDeaths === undefined)
				tnumKills = 0;
			if(tnumKills === undefined)
				tnumKills = 0;
			if(tnumAssists === undefined)
				tnumKills = 0;
			//we don't want to subtract crunches if its negative - no backsies!
			var subtotal = tnumDeaths*dmod -tnumKills*kmod - tnumAssists*amod;
			if(subtotal>0)
				prevCrunches+= subtotal;
		}
		return 1 + checkPreviousGames(++prevGameTotal,dmod,kmod,amod);
	}
}//end checkPreviousGames

//turns epoch milliseconds date into mon/day string
function EMtoMD(t)
{
	var d = new Date(0);
	d.setUTCMilliseconds(t);
	d = d.toString().split(" ");
	d = d[1]+ "/" +d[2];
	return d;
}//end EMtoMD

//displays the number of pushups/crunches you must do, as well as your most recent games date and KDA
//todo:fix crunches so neg are taken out before prev added
function displayInfo(dmod,kmod,amod)
{
	document.getElementById("text").innerHTML = ("On " + date + ":<br> Num kills: " +numKills +"\nNum deaths:" + numDeaths + "\nNum assists: " + numAssists);
	
	prevCrunches = 0;
	var numPrevGames = checkPreviousGames(1,dmod,kmod,amod);
	
	var subtotalP = (numDeaths*dmod)-(numKills*kmod)-(numAssists*amod);
	var subtotalC = (numDeaths*dmod)-(numKills*kmod)-(numAssists*amod)+ prevCrunches;
	
	//negative pushups/crunches just seems awkward. Besides, reverse crunches are hard.
	if(subtotalP<0)
		subtotalP = 0;
	if(subtotalC<0)
		subtotalC = 0;
	if(win)
	{
		document.getElementById("win").innerHTML = "You won! Nice!";
		document.getElementById("pushups").innerHTML = "Pushups: " +subtotalP;
		document.getElementById("crunches").innerHTML = "Crunches: " + subtotalC	+ ", including " + prevCrunches + " from " + numPrevGames + " previous game(s).";		
	}
	
	if(!win)
	{
		document.getElementById("win").innerHTML = "Tough luck... Maybe you'll win the next one!";
		document.getElementById("pushups").innerHTML = "Pushups: " + 1.5*subtotalP;
		document.getElementById("crunches").innerHTML = "Crunches: " + subtotalC + ", including " + prevCrunches + " from " + numPrevGames + " previous game(s).";		
	}
}//end displayInfo

function displayChamp(id)
{
	var champclient = new XMLHttpRequest();
	var champURL = urlBase + "api/lol/static-data/na/v1.2/champion/" + id+ key;
	champclient.open("GET", champURL, false);
	champclient.send();
	var strJSON = champclient.responseText;
	var temp = JSON.parse(strJSON);
	var name = temp.key;
	document.getElementById("champImage").setAttribute("src","http://ddragon.leagueoflegends.com/cdn/5.12.1/img/champion/" + name + ".png");
	document.getElementById("champImage").setAttribute("title",name);
	document.getElementById("champImage").setAttribute("alt","I can't find the picture for " + name + ". Sorry mate.");
}//end displayChamp