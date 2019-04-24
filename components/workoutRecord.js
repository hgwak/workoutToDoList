

class WorkoutRecord{
	constructor(id, workoutName, sets, reps, deleteCallback=()=>{}, countCallback=()=>{}){//es6
		this.data = {
			id: id,
			workoutName: workoutName,
			sets: parseInt(sets),
			reps: parseInt(reps)
		}
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

	toggleComplete(){
		$(this).toggleClass('btn-danger btn-primary');
		// $(this).toggleClass('btn-primary');
		let textToggle = $(this).text()
		$(this).text(
			textToggle === "Incomplete" ? "Complete" : "Incomplete"
		);
	}
	
	render(){
		this.domElements.row = $('<tr>').addClass('add-border');
		this.domElements.checkBox = $('<button>').addClass('btn btn-danger completed-check').text('Incomplete').on('click', this.toggleComplete);
		this.domElements.checkBoxHolder = $('<td>').addClass('d-flex justify-content-center col').append(this.domElements.checkBox)
		this.domElements.name = $('<td>').addClass('text-center').text(this.data.workoutName);
		this.domElements.sets = $('<td>').addClass('text-center').text(this.data.sets);
		this.domElements.reps = $('<td>').addClass('text-center').text(this.data.reps);
		this.deleteButtonSection = $('<td>').addClass('d-flex justify-content-center');
		this.deleteButtonDOM = $('<button>').addClass('btn btn-danger').text('Delete');
		$(this.deleteButtonDOM).click(this.handleDelete);
		this.domElements.deleteButton = $(this.deleteButtonSection).append(this.deleteButtonDOM);
		this.newTable = $(this.domElements.row).append(this.domElements.checkBoxHolder, this.domElements.name,this.domElements.sets, this.domElements.reps, this.domElements.deleteButton);
		$('tbody').append(this.newTable);
		return this.domElements.row;
	}
	
	handleDelete(){
		this.deleteCallback(this);
		this.domElements.row.remove();
		this.countCallback();
		return;
	}
}