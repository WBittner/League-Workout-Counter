define(["./Updater", "./Constants"], 

function( Updater, Constants ) 
{

	//Inherit all of the functions of the super class
	MatchHistoryUpdater.prototype = Object.create(Updater.prototype); // See note below

	// Define the constructor
	function MatchHistoryUpdater( summonerID, region ) 
	{		
		var matchHistoryURL = 
				Constants.URLBase + "/" +
				region + "/" + 
				"v" + Constants.matchHistoryVersion + "/" +
				"game/by-summoner/" +
				summonerID + "/" + 
				"recent" +
				"?api_key=" + Constants.APIKey;
		
		//Make the call to the supers constructor
		Updater.call( this, matchHistoryURL );
		
		this.summonerID = summonerID;
		this.region = region;
	};


    return MatchHistoryUpdater;
    
}
);