


class WorkoutTracker{
	constructor( elementConfig ){
		this.model = new WorkoutListHolder(this.displayTotal); 
		this.elementConfig = elementConfig;
		this.handleCancel = this.handleCancel.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		
	}

	addEventHandlers(){
		var addButton = this.elementConfig.addButton;
		var cancelButton = this.elementConfig.cancelButton;
		addButton.on('click',this.handleAdd);
		cancelButton.on('click',this.handleCancel);
	}

	clearInputs(){
		this.elementConfig.workoutNameInput.val('');
		this.elementConfig.setsInput.val('');
		this.elementConfig.repsInput.val('');
	}

	handleCancel(){
		this.clearInputs();
	}
	
	handleAdd(){
		var workoutName = this.elementConfig.workoutNameInput.val();
		var sets = this.elementConfig.setsInput.val();
		var reps = this.elementConfig.repsInput.val();
		if(this.hasErrors(workoutName, sets, reps)){
			return;
		};
		this.model.add(workoutName, sets, reps);
		this.clearInputs();
		this.displayAll();
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
			$('.repstCheck').hide();
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
		this.elementConfig.totalArea.text(total);
		return;
	}
}