

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
		this.handleDelete = this.handleDelete.bind( this );
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
	
	render(){
		this.domElements.row = $('<tr>');
		this.domElements.name = $('<td>').addClass('text-center').text(this.data.workoutName);
		this.domElements.course = $('<td>').addClass('text-center').text(this.data.sets);
		this.domElements.grade = $('<td>').addClass('text-center').text(this.data.reps);
		this.deleteButtonSection = $('<td>').addClass('d-flex justify-content-center');
		this.deleteButtonDOM = $('<button>').addClass('btn btn-danger').text('delete');
		$(this.deleteButtonDOM).click(this.handleDelete);
		this.domElements.deleteButton = $(this.deleteButtonSection).append(this.deleteButtonDOM);
		this.newTable = $(this.domElements.row).append(this.domElements.name,this.domElements.course,this.domElements.grade,this.domElements.deleteButton);
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