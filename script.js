$(document).ready(startApp);

var SGT;
function startApp() {
	/*
	startTests will test your code.  Once it works, 
	delete startTests and uncomment the code below to run YOUR code and test it
	*/
    // startTests();
    SGT = new WorkoutTracker({
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
    $('.completed-check').on('click', toggleComplete);
}

function toggleComplete(){
    
}



var pauseFlag = false;
var timerFlag = false;