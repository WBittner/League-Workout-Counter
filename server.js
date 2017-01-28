/*********************************
Hello world!
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
***********************************/
//REST services!!
const express = require('express');
const app = express();
app.use(express.static('public')); //can now redirect to any static file in 'public' subdir!

const workoutBuilder = require('./LeagueWorkoutBuilder');

//Send it to meeee
app.get('/getWorkout/id/:userName', workoutBuilder);

app.get('/', (req, res) => res.redirect('/index.html'));


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