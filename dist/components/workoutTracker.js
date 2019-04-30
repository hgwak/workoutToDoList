'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorkoutTracker = function () {
	function WorkoutTracker(elementConfig) {
		var _this = this;

		_classCallCheck(this, WorkoutTracker);

		this.loadRecords = function () {
			var localStorageRecords = JSON.parse(localStorage.records);
			if (!!localStorageRecords && localStorageRecords.length !== _this.model.records.length) {
				localStorageRecords.forEach(function (item) {
					_this.model.add(item.data.workoutName, item.data.defaultSets, item.data.reps);
				});
			}
			_this.displayAll();
		};

		this.clearInputs = function () {
			_this.elementConfig.workoutNameInput.val('');
			_this.elementConfig.setsInput.val('');
			_this.elementConfig.repsInput.val('');
			_this.elementConfig.editWorkoutName.val('');
			_this.elementConfig.editSets.val('');
			_this.elementConfig.editReps.val('');
			$('.invalid-feedback').hide();
		};

		this.editForms = function (event) {
			if (event.which === 13 || event.type === 'click') {
				var workoutName = _this.elementConfig.editWorkoutName.val();
				var sets = _this.elementConfig.editSets.val();
				var reps = _this.elementConfig.editReps.val();
				if (_this.hasErrors(workoutName, sets, reps)) {
					return;
				}
				for (var i = 0; i < _this.model.records.length; i++) {
					if (editID === _this.model.records[i].data.id) {
						_this.model.records[i].update('workoutName', workoutName);
						_this.model.records[i].data.sets = parseInt(sets);
						_this.model.records[i].data.defaultSets = parseInt(sets);
						_this.model.records[i].update('reps', reps);
						break;
					}
				}
				_this.clearInputs();
				_this.displayAll();
				$('#editWorkout').click();
			}
		};

		this.hasErrors = function (workoutName, sets, reps) {
			var errorCount = 0;
			if (workoutName.length < 2 || !isNaN(workoutName)) {
				$('.workoutCheck').show();
				errorCount++;
			} else {
				$('.workoutCheck').hide();
			}
			if (isNaN(sets) || sets.length === 0 || sets > 10) {
				$('.setsCheck').show();
				errorCount++;
			} else {
				$('.setsCheck').hide();
			}
			if (isNaN(reps) || reps.length === 0 || reps > 50) {
				$('.repsCheck').show();
				errorCount++;
			} else {
				$('.repsCheck').hide();
			}
			return errorCount ? true : false;
		};

		this.displayTotal = function () {
			var total = _this.model.calculateTotal();
			_this.elementConfig.totalSets.text(parseInt(total));
			return;
		};

		this.model = new WorkoutListHolder(this.displayTotal, this.editForms);
		this.elementConfig = elementConfig;
		this.handleCancel = this.handleCancel.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}

	_createClass(WorkoutTracker, [{
		key: 'addEventHandlers',
		value: function addEventHandlers() {
			var addButton = this.elementConfig.addButton;
			var cancelButton = this.elementConfig.cancelButton;
			var editButton = this.elementConfig.editButton;
			addButton.on('click', this.handleAdd);
			$('.student-add-form').on('keypress', this.handleAdd);
			cancelButton.on('click', this.handleCancel);
			editButton.on('click', this.editForms);
			$('.student-edit-form').on('keypress', this.editForms);
		}
	}, {
		key: 'handleCancel',
		value: function handleCancel() {
			this.clearInputs();
		}
	}, {
		key: 'handleAdd',
		value: function handleAdd(event) {
			if (event.which === 13 || event.type === 'click') {
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
	}, {
		key: 'displayAll',
		value: function displayAll() {
			this.elementConfig.displayArea.empty();
			var allWorkouts = this.model.records;
			for (var arrayIndex = 0; arrayIndex < allWorkouts.length; arrayIndex++) {
				this.model.records[arrayIndex].render();
			}
			this.displayTotal();
		}
	}]);

	return WorkoutTracker;
}();