'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorkoutListHolder = function () {
	function WorkoutListHolder() {
		var _this = this;

		var countCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

		_classCallCheck(this, WorkoutListHolder);

		this.calculateTotal = function () {
			var sumSets = 0;
			for (var arrayIndex = 0; arrayIndex < _this.records.length; arrayIndex++) {
				var currentSetCount = _this.records[arrayIndex].data.sets;
				sumSets += currentSetCount;
			}
			if (_this.records.length === 0) {
				return 0;
			} else {
				return sumSets;
			}
		};

		this.countCallback = countCallback;
		this.records = [];
		this.currentID = 0;
		this.remove = this.remove.bind(this);
	}

	_createClass(WorkoutListHolder, [{
		key: 'getNextID',
		value: function getNextID() {
			this.currentID++;
			return this.currentID;
		}
	}, {
		key: 'add',
		value: function add(workoutName, sets, reps) {
			var addWorkout = new WorkoutRecord(this.getNextID(), workoutName, sets, reps, this.remove, this.countCallback, this.editFormCallBack);
			this.records.push(addWorkout);
			return this.records.length;
		}
	}, {
		key: 'remove',
		value: function remove(removeWorkoutRecord) {
			if ((typeof removeWorkoutRecord === 'undefined' ? 'undefined' : _typeof(removeWorkoutRecord)) !== 'object') {
				return false;
			} else {
				var remove_workout_id = removeWorkoutRecord.data.id;
				for (var recordIndex = 0; recordIndex < this.records.length; recordIndex++) {
					var currentWorkoutList = this.records[recordIndex].data.id;
					if (remove_workout_id === currentWorkoutList) {
						this.records.splice(recordIndex, 1);
						localStorage[currentSelectedWorkout] = JSON.stringify(this.records);
						return true;
					}
				}
				return false;
			}
		}
	}, {
		key: 'getWorkoutList',
		value: function getWorkoutList() {
			return this.records;
		}
	}, {
		key: 'getStudentByField',
		value: function getStudentByField(workoutProperty, valueToSearch) {
			for (var arrayIndex = 0; arrayIndex < this.records.length; arrayIndex++) {
				if (this.records[arrayIndex].data[workoutProperty] === valueToSearch) {
					return this.records[arrayIndex];
				}
			}
			return -1;
		}
	}]);

	return WorkoutListHolder;
}();