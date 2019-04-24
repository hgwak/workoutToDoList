

class WorkoutListHolder{
	constructor(countCallback=()=>{}){
		this.countCallback = countCallback;
		this.records=[];
		this.currentID = 0;
		this.remove = this.remove.bind(this);
	}

	getNextID(){
		this.currentID++;
		return this.currentID;
	}
	
	add( workoutName, sets, reps ){
		var addWorkout = new WorkoutRecord(this.getNextID(), workoutName, sets, reps, this.remove, this.countCallback);
		this.records.push(addWorkout);
		return this.records.length;

	}
	
	remove( removeWorkoutRecord ){
		if(typeof(removeWorkoutRecord)!=='object'){
			return false;
		}else{
			var remove_workout_id = removeWorkoutRecord.data.id;
			for (var recordIndex = 0; recordIndex < this.records.length; recordIndex++) {
				var currentWorkoutList = this.records[recordIndex].data.id;
				if (remove_workout_id === currentWorkoutList) {
					this.records.splice(recordIndex, 1);
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
	
	calculateTotal=()=>{
		var sumSets=0;
		for(var arrayIndex = 0; arrayIndex < this.records.length; arrayIndex++){
			var currentSetCount = this.records[arrayIndex].data.sets;
			sumSets += currentSetCount;
		}
		if(this.records.length===0){
			return 0;
		}else{
			return sumSets;
		}
	}
}
