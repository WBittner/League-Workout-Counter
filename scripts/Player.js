define(["./MatchHistoryUpdater", "./Constants"], 

function( MatchHistoryUpdater, Constants ) 
{

	var that;
	// Define the constructor
	function Player( summonerName, region ) 
	{		
		that = this;
		this.summonerName = summonerName;
		this.region = region;
		
		this.getSummonerId();
	};
	
	Player.prototype.getSummonerId = function()
	{
		var summonerIDURL = 
			Constants.URLBase + "/" +
			this.region + "/" + 
			"v" + Constants.summonerVersion + "/" +
			"summoner/by-name/" +
			this.summonerName + "/" + 
			"?api_key=" + Constants.APIKey;
			
		$.ajax({
			url: summonerIDURL,
		   	type: 'GET',
		   	error: error,
		    success: processSummonerJSON
		});	
	};
	
	function error( jqXHR, textStatus, errorThrown )
    {
    	console.log("ERROR: \n" + textStatus + "\n" + errorThrown );
    };
	
	function processSummonerJSON( data )
	{
		var tempName = that.summonerName.toLowerCase().trim();
		tempName = tempName.replace(" ","");
		that.summonerId = data[tempName].id;
		
		console.log("Id: " + that.summonerId + "\nCreating MHU");
		
		//Create our updater
		that.MatchHistoryUpdater = new MatchHistoryUpdater( that.summonerId, that.region );
	};


    return Player;
    
}
);