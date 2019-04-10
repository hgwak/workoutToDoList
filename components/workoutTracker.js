


class WorkoutTracker{
	constructor( elementConfig ){
		this.model = new WorkoutListHolder(); 
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
		this.elementConfig.nameInput.val('');
		this.elementConfig.courseInput.val('');
		this.elementConfig.gradeInput.val('');
	}

	handleCancel(){
		this.clearInputs();
	}
	
	handleAdd(){
		var name = this.elementConfig.nameInput.val();
		var course = this.elementConfig.courseInput.val();
		var grade = this.elementConfig.gradeInput.val();
		this.model.add(name, course, grade);
		this.clearInputs();
		this.displayAll();
	}
	
	displayAll(){
		this.elementConfig.displayArea.empty();
		var allWorkouts = this.model.records;
		for(var arrayIndex = 0; arrayIndex < allWorkouts.length;arrayIndex++ ){
			this.model.records[arrayIndex].render();
		}
		this.displayAverage();
	}
	
	displayAverage(){
		var average = this.model.calculateGradeAverage()
		this.elementConfig.averageArea.text(average);
		return;
	}
}