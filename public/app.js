/**
 * Note: This page is sent to client, so Vue is defined by CDN in index.html
 */
var App = new Vue ({
    el: "#app",
    data: {
        name: "",
        infoText: "Type your name then click the button above to get your info",
        won: "",
        exercise1: "",
        exercise2: "",
        ready: false
    },
    methods: {
        getKDAs: function(level) {
            this.infoText="Fetching KDAs for " + this.name + ", goin' " + level;

            $.ajax({
                url: "http://localhost:3000/getWorkout/id/" + this.name,
                type: 'GET',
                error: this.restError,
                success: this.restSuccess
		    }); 
        },
        restSuccess: function(data) {
            console.log("Success: ", data);
            if(!data.error) {
                this.won = this.getLabelAndValueString(data.stats.lastGame.won);
                this.exercise1 = this.getLabelAndValueString(data.workout.crunches);
                this.exercise2 = this.getLabelAndValueString(data.workout.pushups);
                this.ready = true;
            }
            else {
                console.log("Error:", data.error);
                this.infoText="An error has occured. Please try again in a bit."
                this.ready = true;
            }
        },
        getLabelAndValueString: function(workout) {
            return workout.name + ": " + workout.value;
        },
        restError: function(error) {
            console.log("Error:", error);
            this.infoText="An error has occured. Please try again in a bit."
            this.ready = true;
        }
    }
});