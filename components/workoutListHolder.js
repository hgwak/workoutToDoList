

class WorkoutListHolder{
	constructor(){
		this.records=[];
		this.currentID = 0;
		this.remove = this.remove.bind(this);
	}

	getNextID(){
		this.currentID++;
		return this.currentID;
	}
	
	add( name, course, grade ){
		var addWorkout = new WorkoutRecord(this.getNextID(), name, course, grade,this.remove);
		this.records.push(addWorkout);
		return this.records.length;

	}
	
	remove( removeWorkoutRecord ){
		if(typeof(removeWorkoutRecord)!=='object'){
			return false;
		}else{
			var remove_workout_id = removeWorkoutRecord.data.id;
			for(var recordIndex = 0; recordIndex < this.records.length; recordIndex++){
				var currentWorkoutList = this.records[recordIndex].data.id;
				if(remove_workout_id === currentWorkoutList){
					this.records.splice(recordIndex,1);
					return true;
				}
			}
			return false;
		}
	}
	
	getWorkoutList(){
		return this.records;
	}
	
	getStudentByField( workoutProperty, valueToSearch ){
		for(var arrayIndex = 0; arrayIndex < this.records.length; arrayIndex++){
			if(this.records[arrayIndex].data[workoutProperty]===valueToSearch){
				return this.records[arrayIndex];
			}
		}
		return -1;
	}
	
	//Take this out****
	calculateGradeAverage(){
		var sumGrade=0;
		var count=0;
		for(var arrayIndex = 0; arrayIndex < this.records.length; arrayIndex++){
			var currentStudentGrade = this.records[arrayIndex].data.grade;
			sumGrade += currentStudentGrade;
			count++;
		}
		if(this.records.length===0){
			return 0;
		}else{
			return sumGrade/count;
		}
	}
}
