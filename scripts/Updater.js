//This class will take a URL and make a "get" ajax call to it, then store the data.
define(function () 
{

	var that;
	
    function Updater( URL ) 
    {
    	that = this;
        this.URL = URL;
    };
    
    Updater.prototype.printURL = function()
    {
    	console.log(this.URL);
    };
    
    Updater.prototype.update = function()
    {
		$.ajax({
			url: this.URL,
		   	type: 'GET',
		   	error: handleError,
		    success: handleData
		});
    };
    
    function handleError( jqXHR, textStatus, errorThrown )
    {
    	console.log("ERROR: \n" + textStatus + "\n" + errorThrown );
    };
    
    function handleData( data, textStatus, jqXHR )
    {
    	console.log("Success :D");
    	that.data = data;
    };


    return Updater;
});