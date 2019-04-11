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
        totalArea: $(".totalGrade")
    });
    SGT.addEventHandlers();
    addEventHandlers();
}

function addEventHandlers(){
    $('.timer').on('click', function(){
        if(!timerFlag){
            startTimer();
            timerFlag = true;
        }
    })
}

var timerFlag = false;