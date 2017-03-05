/**
 * Note: This page is sent to client, so Vue is defined by CDN in index.html
 */
var App = new Vue ({
    el: "#app",
    data: {
        name: "",
        infoText: "Type your name then click the button above to get your info",
        displayInfo: [],
        champImageSrc: "",
        ready: false
    },
    methods: {
        getKDAs: function(level, workout) {
            this.ready = false;
            this.infoText="Fetching KDAs for " + this.name;

            $.ajax({
                url: "http://localhost:3000/getWorkout/userName/" + this.name + "/workout/" + JSON.stringify(workout),
                type: 'GET',
                error: this.restError,
                success: this.restSuccess
            });
        },
        restSuccess: function(data) {
            if(!data.error) {
                this.displayInfo = [];

                this.displayInfo.push({
                    value: data.stats.Won ? "You won, good job!" : "You'll get 'em next time ):"
                });

                this.recursivelyAddToDisplayInfo(data.stats.KDAs.lastGameKDA);
                this.recursivelyAddToDisplayInfo(data.workout);
                this.champImageSrc = data.championIconURL;
                this.ready = true;
            }
            else {
                console.log("Error:", data.error);
                this.infoText="An error has occured. Please try again in a bit."
                this.ready = true;
            }
        },
        recursivelyAddToDisplayInfo: function(rootObject, namePrefix) {
            for(var info in rootObject) {
                if(typeof rootObject[info] !== "object") {
                    this.displayInfo.push({
                        name: info + (namePrefix ? " (" + namePrefix + ")" : ""),
                        value: rootObject[info]
                    });
                } else {
                    this.recursivelyAddToDisplayInfo(rootObject[info], info);
                }
            }
        },
        restError: function(error) {
            console.log("Error:", error);
            this.infoText="An error has occured. Please try again in a bit."
            this.ready = true;
        }
    }
});