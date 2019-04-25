

class WorkoutRecord{
	constructor(id, workoutName, sets, reps, deleteCallback=()=>{}, countCallback=()=>{}){//es6
		this.data = {
			id: id,
			workoutName: workoutName,
			sets: parseInt(sets),
			reps: parseInt(reps),
			complete: "Incomplete"
		};
		this.deleteCallback = deleteCallback;
		this.countCallback = countCallback;
		this.domElements = {
			row: null,
			workoutName: null,
			sets: null,
			reps: null,
			operations: null,
			deleteButton: null
		}
		this.completeSets = this.completeSets.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	update(changeValue, newValue ){
		if(!this.data[changeValue]){
			return false;
		}else{
			this.data[changeValue] = newValue;
			$(this.domElements[changeValue]).text(newValue);
			return true;
		}
	}
	
	getData(){
		return this.data;
	}

	toggleComplete=(event)=>{
		console.log(event)
		let targetElement = event.currentTarget.parentElement;
		targetElement.nextElementSibling.classList.add("strikeout");
		targetElement.nextElementSibling.nextElementSibling.classList.add("strikeout");
		targetElement.nextElementSibling.nextElementSibling.nextElementSibling.classList.add("strikeout");
		targetElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[0].classList.add("strikeout");
		$(event.target).addClass('btn-primary');
		$(event.target).removeClass('btn-danger');
		$(event.target).text("Complete");
		if($(event.target).text()=== "Complete"){
			this.data.complete = "Complete"
			this.completeSets();
		}
	}

	completeSets=()=>{
		this.update('sets',0);
		this.countCallback();
	}
	
	render(){
		this.domElements.row = $('<tr>').addClass('add-border');
		this.domElements.checkBox = $('<button>').addClass('btn btn-danger completed-check').text(this.data.complete).on('click', this.toggleComplete);
		if(this.data.complete==="Complete"){
			this.domElements.checkBox.toggleClass('btn-danger btn-primary')
		}
		this.domElements.checkBoxHolder = $('<td>').addClass('d-flex justify-content-center col').append(this.domElements.checkBox)
		this.domElements.name = $('<td>').addClass('text-center').text(this.data.workoutName);
		this.domElements.sets = $('<td>').addClass('text-center').text(this.data.sets);
		this.domElements.reps = $('<td>').addClass('text-center').text(this.data.reps);
		this.deleteButtonSection = $('<td>').addClass('d-flex justify-content-center');
		this.deleteButtonDOM = $('<button>').addClass('btn btn-danger').text('X');
		this.editButtonDOM = $('<button data-toggle="modal" data-target="#editWorkout">').addClass('btn btn-info mr-1 editForm').text('Edit').on('click', this.handleEdit);
		$(this.deleteButtonDOM).click(this.handleDelete);
		this.domElements.deleteButton = $(this.deleteButtonSection).append(this.editButtonDOM,this.deleteButtonDOM);
		this.newTable = $(this.domElements.row).append(this.domElements.checkBoxHolder, this.domElements.name,this.domElements.sets, this.domElements.reps, this.domElements.deleteButton);
		$('tbody').append(this.newTable);
		return this.domElements.row;
	}
	
	handleEdit = () => {
		editID = this.data.id;
		$('#editWorkoutName').val(this.data.workoutName);
		$('#editSets').val(this.data.sets);
		$('#editReps').val(this.data.reps);
	}

	handleDelete(){
		let deleteConfirm = confirm('Are you sure you want to remove this workout?');
		if(deleteConfirm){
			this.deleteCallback(this);
			this.domElements.row.remove();
			this.countCallback();
			return;
		}else{
			return;
		}
	}
}