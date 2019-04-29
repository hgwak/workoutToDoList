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
    loadWorkoutNames();
}

function loadWorkoutNames(){
    let workoutNames = JSON.parse(localStorage['workoutNames']);
    let workout;
    for(workout in workoutNames){
        if(workoutNames[workout] !== null){
            let workoutNameClass = '.' + workout;
            $(workoutNameClass).text(workoutNames[workout]);
        }
    }
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
    $('.save-click-handler').on('click','.btn-block', saveWorkout);
    $('.saveTextButton').on('click', saveWorkoutName);
}

function loadWorkout(event){
    workoutList.model.records = [];
    let workout = event.currentTarget.classList[3];
    if(localStorage[workout]!== undefined){
        let localStorageRecords = JSON.parse(localStorage[workout])
        if (!!localStorageRecords && localStorageRecords.length !== workoutList.model.records.length) {
            localStorageRecords.forEach((item) => {
                workoutList.model.add(item.data.workoutName, item.data.defaultSets, item.data.reps)
            })
        }
        workoutList.displayAll();
        $('.close').click();
    }    
}

function saveWorkout(event){
    if(workoutList.model.records.length > 0){
        currentTarget = event.currentTarget.classList[3];
        $('.save-click-handler > button').hide();
        $('.saveWorkoutName').show();
        localStorage[currentTarget] = JSON.stringify(workoutList.model.records);
    }
}

function saveWorkoutName(){
    let workoutText = $('#saveWorkoutNameText').val();
    let currentTargetClass = '.' + currentTarget;
    $(currentTargetClass).text(workoutText);
    if(localStorage['workoutNames'] === undefined){
        localStorage['workoutNames'] = JSON.stringify({
            'workout1':null,
            'workout2':null,
            'workout3':null,
            'workout4':null
        })
    }
    let parseLocalStorage = JSON.parse(localStorage['workoutNames']);
    parseLocalStorage[currentTarget] = workoutText;
    localStorage['workoutNames'] = JSON.stringify(parseLocalStorage);
    $('.close').click();
    setTimeout(()=>{
        $('.saveWorkoutName').hide();
        $('.save-click-handler > button').show();
        $('#saveWorkoutNameText').val('');
    },0)
}


var currentTarget;
var editID;
var pauseFlag = false;
var timerFlag = false;