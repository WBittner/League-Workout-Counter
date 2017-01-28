#  LWC TO-DO doc
--------------------------

This project is in deep need of some love - We gonna do it right this time.

* End Game:
	* Front end - vue/html/js/css
	* Back end - node.js


Flow of webapp for first release:
1) Connect to website.Textbox for inputting summoner name. Button to go.
2) Sends summoner name to back end, which processes match history and returns the workout plan
	1) Use name to get summoner ID.
	2) Use summoner ID to get match history
	3) Use match history to create workout.
3) Workout plan is displayed on the front end.

Enhancements:
1) Region
2) EZ/med/hard mode
3) Prettier...
	1) Vue for display 
	2) We all like Riven, but probably should just pull the splash art or bigger picture for games. Can detect skin used? Random? 
4) just send KDAs to front end and let user pick workout? 
	1) Loop/iterate though exercises, infinitely expandable layout rather than 2 exercises hardcoded
5) Get images going again
	1) Integrate LOLDS first?
