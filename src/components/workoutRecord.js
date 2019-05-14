class WorkoutRecord{
	constructor(id, workoutName, sets, reps, deleteCallback=()=>{}, countCallback=()=>{}){//es6
		this.data = {
			id: id,
			workoutName: workoutName,
			defaultSets: parseInt(sets),
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

	update=(changeValue, newValue )=>{
		if(!this.data[changeValue]){
			return false;
		}else{
			this.data[changeValue] = newValue;
			$(this.domElements[changeValue]).text(parseInt(this.data[changeValue]));
		}
	}
	
	getData(){
		return this.data;
	}

	toggleComplete=(event)=>{
		this.data.sets = 0;
		$(this.domElements.sets).text(this.data.sets).append(this.minusIcon).append(this.addIcon)
		this.countCallback();
		let targetElement = event.currentTarget.parentElement;
		targetElement.nextElementSibling.classList.toggle("strikeout");
		targetElement.nextElementSibling.nextElementSibling.classList.toggle("strikeout");
		targetElement.nextElementSibling.nextElementSibling.nextElementSibling.classList.toggle("strikeout");
		targetElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[0].classList.toggle("strikeout");
		targetElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[0].removeAttribute('data-toggle');
		$(event.target).toggleClass('btn-primary');
		$(event.target).toggleClass('btn-danger');
		$(event.target).text($(event.target).text()==="Incomplete"? "Complete" : "Incomplete");
		if($(event.target).text() === "Complete"){
			this.data.complete = "Complete";
			event.currentTarget.parentElement.parentElement.classList.remove('table-primary');
			event.currentTarget.parentElement.parentElement.classList.add('table-dark');
		}else{
			this.data.complete = "Incomplete"
			targetElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[0].setAttribute('data-toggle','modal');
			event.currentTarget.parentElement.parentElement.classList.remove('table-dark');
			//event.currentTarget.parentElement.parentElement.classList.add('table-dark');
		}
	}

	completeSets=(event)=>{
		let classes = event.currentTarget.classList;
		for(let i = 0; i < classes.length; i++){
			if(classes[i] === 'minus'){
				this.data.sets > 0 ? (this.data.sets--) : this.data.sets = 0;
				event.currentTarget.parentElement.parentElement.classList.add('table-primary');
				//let completeButtonText = event.currentTarget.parentElement.previousElementSibling.previousElementSibling.children[0].textContent
			}else if(classes[i]==='add'){
				if(!this.data.sets && this.data.complete === "Complete"){
					this.domElements.checkBox.click();
				}
				this.data.sets++;
			}
		}
		if(!this.data.sets && this.data.complete === "Incomplete"){
			this.domElements.checkBox.click();
		}
		this.countCallback();
		$(this.domElements.sets).text(this.data.sets).append(this.minusIcon).append(this.addIcon)
	}
	


	render=()=>{
		this.domElements.row = $('<tr>').addClass('add-border');
		this.domElements.checkBox = $('<button>').addClass('btn btn-danger completed-check').text(this.data.complete).on('click', this.toggleComplete);
		this.domElements.checkBoxHolder = $('<td>').addClass('d-flex justify-content-center col').append(this.domElements.checkBox)
		this.domElements.name = $('<td>').addClass('text-center').text(this.data.workoutName);
		this.completeSetButton = $('<button>').addClass('btn btn-primary minus btn-sm completeSetButton ml-1');
		this.domElements.sets = $('<td>').addClass('text-center').text(this.data.sets).on('click', 'button', this.completeSets);
		this.minusIcon = this.completeSetButton.append('<i class="fas fa-minus"></i>')
		this.addSetButton = $('<button>').addClass('btn btn-primary btn-sm add completeSetButton ml-1');
		this.addIcon = this.addSetButton.append('<i class="fas fa-plus"></i>')
		this.domElements.sets = this.domElements.sets.append(this.minusIcon).append(this.addIcon)
		this.domElements.reps = $('<td>').addClass('text-center').text(this.data.reps);
		this.deleteButtonSection = $('<td>').addClass('d-flex justify-content-center');
		this.deleteButtonDOM = $('<button>').addClass('btn btn-danger').text('X');
		this.editButtonDOM = $('<button data-toggle="modal" data-target="#editWorkout">').addClass('btn btn-info mr-1 editForm').text('Edit').on('click', this.handleEdit);
		$(this.deleteButtonDOM).click(this.handleDelete);
		if (this.data.complete === "Complete") {
			this.domElements.checkBox.toggleClass('btn-danger btn-primary');
			this.domElements.name.addClass('strikeout');
			this.domElements.sets.addClass('strikeout');
			this.domElements.reps.addClass('strikeout');
			this.editButtonDOM.addClass('strikeout').removeAttr('data-toggle');
		}
		this.domElements.deleteButton = $(this.deleteButtonSection).append(this.editButtonDOM,this.deleteButtonDOM);
		this.newTable = $(this.domElements.row).append(this.domElements.checkBoxHolder, this.domElements.name,this.domElements.sets, this.domElements.reps, this.domElements.deleteButton);
		$('tbody').append(this.newTable);
		return this.domElements.row;
	}
	
	handleEdit = () => {
		editID = this.data.id;
		$('#editWorkoutName').val(this.data.workoutName);
		$('#editSets').val(this.data.defaultSets);
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