//REST services!!
const express = require('express');
const app = express();
app.use(express.static('public')); //can now redirect to any static file in 'public' subdir!

const workoutBuilder = require('./LeagueWorkoutBuilder').buildLeagueWorkout;

//Send it to meeee
app.get('/getWorkout/userName/:userName/workout/:workout', workoutBuilder);

app.listen(3000, function()
{
	console.log("We're on 3k boys!");
});

//Error handling..
app.use(function(err, req, res, next) 
{
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//catch all.. 404
app.use(function(req, res, next) 
{
  res.status(404).send('Sorry cant find that!');
});