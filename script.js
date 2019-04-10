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
        nameInput: $("#studentName"),
        courseInput: $("#studentCourse"),
        gradeInput: $("#studentGrade"),
        displayArea: $("#displayArea"),
        averageArea: $(".avgGrade")
    });
    SGT.addEventHandlers();
    addEventHandlers();
}

function addEventHandlers(){
    $('.student-add-form').on('click',formValidator);
}

function formValidator(){
    
}