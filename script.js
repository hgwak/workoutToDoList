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
    $('.load-click-handler').on('click','button', loadWorkout);
    $('.save-click-handler').on('click','button', saveWorkout);
}

function loadWorkout(){
    workoutList.model.records = [];
    let workout = $(this).text();
    let localStorageRecords = JSON.parse(localStorage[workout])
    if (!!localStorageRecords && localStorageRecords.length !== workoutList.model.records.length) {
        localStorageRecords.forEach((item) => {
            workoutList.model.add(item.data.workoutName, item.data.defaultSets, item.data.reps)
        })
    }
    workoutList.displayAll();
    $('.close').click();
}

function saveWorkout(){
    if(workoutList.model.records.length > 0){
        let workout = $(this).text();
        localStorage[workout] = JSON.stringify(workoutList.model.records)
        $('.close').click();
    }
}

var editID;
var pauseFlag = false;
var timerFlag = false;