


class WorkoutTracker{
	constructor( elementConfig ){
		this.model = new WorkoutListHolder(this.displayTotal, this.editForms); 
		this.elementConfig = elementConfig;
		this.handleCancel = this.handleCancel.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		
	}

	addEventHandlers(){
		var addButton = this.elementConfig.addButton;
		var cancelButton = this.elementConfig.cancelButton;
		var editButton = this.elementConfig.editButton
		addButton.on('click',this.handleAdd);
		$('.student-add-form').on('keypress', this.handleAdd);
		cancelButton.on('click',this.handleCancel);
		editButton.on('click', this.editForms);
		$('.student-edit-form').on('keypress', this.editForms);
	}

	clearInputs=()=>{
		this.elementConfig.workoutNameInput.val('');
		this.elementConfig.setsInput.val('');
		this.elementConfig.repsInput.val('');
		this.elementConfig.editWorkoutName.val('');
		this.elementConfig.editSets.val('');
		this.elementConfig.editReps.val('');
		$('.invalid-feedback').hide();
	}

	handleCancel(){
		this.clearInputs();
	}
	
	handleAdd(event){
		if(event.which===13 || event.type==='click'){
			var workoutName = this.elementConfig.workoutNameInput.val();
			var sets = this.elementConfig.setsInput.val();
			var reps = this.elementConfig.repsInput.val();
			if (this.hasErrors(workoutName, sets, reps)) {
				return;
			};
			this.model.add(workoutName, sets, reps);
			this.clearInputs();
			this.displayAll();
			$('#addWorkout').click();
		}
	}
	
	editForms = (event) => {
		if(event.which===13 || event.type === 'click'){
			var workoutName = this.elementConfig.editWorkoutName.val();
			var sets = this.elementConfig.editSets.val();
			var reps = this.elementConfig.editReps.val();
			if(this.hasErrors(workoutName, sets, reps)){
				return;
			}
			for(var i = 0; i < this.model.records.length; i++){
				if(editID === this.model.records[i].data.id){
					this.model.records[i].update('workoutName', workoutName);
					this.model.records[i].update('sets', sets);
					this.model.records[i].update('reps', reps);
					break;
				}
			}
			this.clearInputs();
			this.displayAll();
			$('#editWorkout').click();
		}
	}

	hasErrors=(workoutName, sets, reps)=>{
		var errorCount = 0;
		if (workoutName.length<2 || !isNaN(workoutName)){
			$('.workoutCheck').show();
			errorCount++
		}else{
			$('.workoutCheck').hide();
		}
		if (isNaN(sets) || sets.length===0){
			$('.setsCheck').show();
			errorCount++
		} else {
			$('.setsCheck').hide();
		}
		if (isNaN(reps) || reps.length===0) {
			$('.repsCheck').show();
			errorCount++
		} else {
			$('.repsCheck').hide();
		}
		return errorCount ? true:false
	}

	displayAll(){
		this.elementConfig.displayArea.empty();
		var allWorkouts = this.model.records;
		for(var arrayIndex = 0; arrayIndex < allWorkouts.length;arrayIndex++ ){
			this.model.records[arrayIndex].render();
		}
		this.displayTotal();
	}
	
	displayTotal=()=>{
		var total = this.model.calculateTotal();
		this.elementConfig.totalSets.text(total);
		return;
	}
}