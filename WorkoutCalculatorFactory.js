/**
 * Factory to return the proper workout calculator
 */

const WORKOUTS = require("./Workouts");

module.exports = {

    /**
     * Note: Any workout names in the array that are not yet implemented are simply dropped on the floor.
     */
    getWorkoutFactory: function(workoutNamesArray) {
        let workoutGenerators = {};

        workoutNamesArray.forEach(function(value, index, array) {
            if(typeof WORKOUTS[value] === "function") {
                workoutGenerators[value] = WORKOUTS[value];
            }
        });

        return Object.assign(WorkoutCalculator.prototype, {workoutGenerators});
    }
};

function WorkoutCalculator() {}

WorkoutCalculator.prototype.calculateWorkout = function(KDAs) {
    let workout = {};

    for (let workoutName in this.workoutGenerators) {
            workout[workoutName] = this.workoutGenerators[workoutName](KDAs);
    }

    return workout;
};





