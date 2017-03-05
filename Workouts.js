/**
 * List of workouts
 * To add a workout all that needs to be done is create a property with key as name and value as a
 *  function to calculate the workout on the exports object, then the backend will be able to accept
 *  the key as one of the indices of the workout array.
 */
module.exports = {
    Pushups: getBasicRepCount.bind(null, {
            killMultiplier: -2,
            deathMultiplier: 4,
            assistMultiplier: -1
        }, false),

    Crunches: getBasicRepCount.bind(null, {
            killMultiplier: -3,
            deathMultiplier: 5,
            assistMultiplier: -1
        }, true),

    Squats: getBasicRepCount.bind(null, {
            killMultiplier: -2,
            deathMultiplier: 6,
            assistMultiplier: -1
        }, true),

    Run: function(KDAs) {
        let repCount = getBasicRepCount({
            killMultiplier: -2,
            deathMultiplier: 2,
            assistMultiplier: -1
        }, false, KDAs);
        return  repCount + " minute" + (repCount !== 1 ? "s" : "");
    }
};

function getBasicRepCount(multipliers, useTotalKDA, KDAs) {
    let kda = useTotalKDA? KDAs.totalKDA : KDAs.lastGameKDA;
    return Math.max((kda.Kills * multipliers.killMultiplier) +
                        (kda.Deaths * multipliers.deathMultiplier) +
                        (kda.Assists * multipliers.assistMultiplier),
                    0);
}