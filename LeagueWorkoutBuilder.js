/*
*
*	Entry point into workout building code.
*
*/

const constants = require("./Constants.js");

module.exports = function (req, res) //this takes in nodeJS request and response as it will be directly called from app.get
{
	console.log("here!!");
	res.send("Received username: " + req.params.user + " constdsf: " + constants.thing);
}