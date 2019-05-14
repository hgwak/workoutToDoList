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
    if(localStorage['workoutNames'] === undefined){
        $('button.loadWorkout').addClass('disabled').attr('disabled','disabled');
        $('.load-click-handler > button').addClass('disabled').attr('disabled','disabled')
        return;
    }
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
    $('#saveList').on('hide.bs.modal', function (e) {
        $('.saveWorkoutName').hide();
        $('.save-click-handler > button').show();
    })
    $('.loadWorkout').on('click', checkSavedWorkoutNames)    
}

function checkSavedWorkoutNames(){
    if(localStorage.workoutNames){
        let local = JSON.parse(localStorage.workoutNames);
        for(let i in local){
            if(local[i] !== null && (JSON.parse(localStorage[i])).length > 0){
                $(".load-click-handler > " + '.'+ i).removeAttr('disabled').removeClass('disabled')
            }else{
                $(".load-click-handler > " + '.' + i).attr('disabled','disabled');
                $(".load-click-handler > " + '.' + i).addClass('disabled')
            }
        }
    }
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
        currentSelectedWorkout = workout;
        workoutList.displayAll();
        $('.close').click();
        if (workoutList.model.records.length) {
            $('.saveWorkout').removeAttr('disabled');
            $('.saveWorkout').removeClass('disabled');
            $('.empty-indicator').hide();
        }
    }    
}

function saveWorkout(event){
    if(workoutList.model.records.length > 0){
        currentTarget = event.currentTarget.classList[3];
        $('.save-click-handler > button').hide();
        if (localStorage['workoutNames']) {
            let local = JSON.parse(localStorage.workoutNames);
            if (local[currentTarget]) {
                $('#saveWorkoutNameText').val(local[currentTarget])
            }
        }
        $('.saveWorkoutName').show();
        localStorage[currentTarget] = JSON.stringify(workoutList.model.records);
    }
}

function saveWorkoutName(){
    let workoutText = $('#saveWorkoutNameText').val();
    if(workoutText.length < 2 || !isNaN(workoutText)){
        $('.saveWorkoutFeedback').show();
        return;
    }
    $('.saveWorkoutFeedback').hide();
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
    $('.confirm-save').css({'visibility':'visible'})
    $('.close').click();
    $('.saveWorkoutName').hide();
    $('.save-click-handler > button').show();
    $('#saveWorkoutNameText').val('');
    $('.loadWorkout').removeAttr('disabled').removeClass('disabled')
    setTimeout(()=>{
        $('.confirm-save').css({'visibility':'hidden'})
    },1500)
}

var currentSelectedWorkout;
var currentTarget;
var editID;
var pauseFlag = false;
var timerFlag = false;