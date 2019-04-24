$(document).ready(startApp);

var workoutList;
function startApp() {
    workoutList = new WorkoutTracker({
        editButton: $("#editButton"),
        addButton: $("#addButton"),
        cancelButton: $(".cancelButton"),
        workoutNameInput: $("#workoutName"),
        editWorkoutName: $("#editWorkoutName"),
        setsInput: $("#sets"),
        editSets: $("#editSets"),
        editReps: $("#editReps"),
        repsInput: $("#reps"),
        displayArea: $("#displayArea"),
        totalSets: $(".totalSets")
    });
    workoutList.addEventHandlers();
    addEventHandlers();
}

function addEventHandlers(){
    $('.startStop').on('click', function(){
        if(!timerFlag){
            startTimer();
            timerFlag = true;
            $('.startStop').text('Stop');
        }else{
            pauseFlag = !pauseFlag;
            $('.startStop').text('Start');
        }
    })
    $('.reset').on('click', resetTimer);
    $('.dropdown-item').on('click', setTimer)

}

var editID;
var pauseFlag = false;
var timerFlag = false;