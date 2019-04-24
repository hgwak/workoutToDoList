$(document).ready(startApp);

var SGT;
function startApp() {
    SGT = new WorkoutTracker({
        editButton: $('.edit-form'),
        addButton: $("#addButton"),
        cancelButton: $("#cancelButton"),
        workoutNameInput: $("#workoutName"),
        setsInput: $("#sets"),
        repsInput: $("#reps"),
        displayArea: $("#displayArea"),
        totalSets: $(".totalSets")
    });
    SGT.addEventHandlers();
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

var pauseFlag = false;
var timerFlag = false;