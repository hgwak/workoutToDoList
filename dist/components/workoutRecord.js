"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorkoutRecord = function () {
	function WorkoutRecord(id, workoutName, sets, reps) {
		var _this = this;

		var deleteCallback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};
		var countCallback = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {};

		_classCallCheck(this, WorkoutRecord);

		this.update = function (changeValue, newValue) {
			if (!_this.data[changeValue]) {
				return false;
			} else {
				_this.data[changeValue] = newValue;
				$(_this.domElements[changeValue]).text(parseInt(_this.data[changeValue]));
			}
		};

		this.toggleComplete = function (event) {
			_this.data.sets = 0;
			$(_this.domElements.sets).text(_this.data.sets).append(_this.minusIcon).append(_this.addIcon);
			_this.countCallback();
			var targetElement = event.currentTarget.parentElement;
			targetElement.nextElementSibling.classList.toggle("strikeout");
			targetElement.nextElementSibling.nextElementSibling.classList.toggle("strikeout");
			targetElement.nextElementSibling.nextElementSibling.nextElementSibling.classList.toggle("strikeout");
			targetElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[0].classList.toggle("strikeout");
			targetElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[0].removeAttribute('data-toggle');
			$(event.target).toggleClass('btn-primary');
			$(event.target).toggleClass('btn-danger');
			$(event.target).text($(event.target).text() === "Incomplete" ? "Complete" : "Incomplete");
			if ($(event.target).text() === "Complete") {
				_this.data.complete = "Complete";
				event.currentTarget.parentElement.parentElement.classList.remove('table-primary');
				event.currentTarget.parentElement.parentElement.classList.add('table-dark');
			} else {
				_this.data.complete = "Incomplete";
				targetElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[0].setAttribute('data-toggle', 'modal');
				event.currentTarget.parentElement.parentElement.classList.remove('table-dark');
				//event.currentTarget.parentElement.parentElement.classList.add('table-dark');
			}
		};

		this.completeSets = function (event) {
			var classes = event.currentTarget.classList;
			for (var i = 0; i < classes.length; i++) {
				if (classes[i] === 'minus') {
					_this.data.sets > 0 ? _this.data.sets-- : _this.data.sets = 0;
					event.currentTarget.parentElement.parentElement.classList.add('table-primary');
					//let completeButtonText = event.currentTarget.parentElement.previousElementSibling.previousElementSibling.children[0].textContent
				} else if (classes[i] === 'add') {
					if (!_this.data.sets && _this.data.complete === "Complete") {
						_this.domElements.checkBox.click();
					}
					_this.data.sets++;
				}
			}
			if (!_this.data.sets && _this.data.complete === "Incomplete") {
				_this.domElements.checkBox.click();
			}
			_this.countCallback();
			$(_this.domElements.sets).text(_this.data.sets).append(_this.minusIcon).append(_this.addIcon);
		};

		this.render = function () {
			_this.domElements.row = $('<tr>').addClass('add-border');
			_this.domElements.checkBox = $('<button>').addClass('btn btn-danger completed-check').text(_this.data.complete).on('click', _this.toggleComplete);
			_this.domElements.checkBoxHolder = $('<td>').addClass('d-flex justify-content-center col').append(_this.domElements.checkBox);
			_this.domElements.name = $('<td>').addClass('text-center').text(_this.data.workoutName);
			_this.completeSetButton = $('<button>').addClass('btn btn-primary minus btn-sm completeSetButton ml-1');
			_this.domElements.sets = $('<td>').addClass('text-center').text(_this.data.sets).on('click', 'button', _this.completeSets);
			_this.minusIcon = _this.completeSetButton.append('<i class="fas fa-minus"></i>');
			_this.addSetButton = $('<button>').addClass('btn btn-primary btn-sm add completeSetButton ml-1');
			_this.addIcon = _this.addSetButton.append('<i class="fas fa-plus"></i>');
			_this.domElements.sets = _this.domElements.sets.append(_this.minusIcon).append(_this.addIcon);
			_this.domElements.reps = $('<td>').addClass('text-center').text(_this.data.reps);
			_this.deleteButtonSection = $('<td>').addClass('d-flex justify-content-center');
			_this.deleteButtonDOM = $('<button>').addClass('btn btn-danger').text('X');
			_this.editButtonDOM = $('<button data-toggle="modal" data-target="#editWorkout">').addClass('btn btn-info mr-1 editForm').text('Edit').on('click', _this.handleEdit);
			$(_this.deleteButtonDOM).click(_this.handleDelete);
			if (_this.data.complete === "Complete") {
				_this.domElements.checkBox.toggleClass('btn-danger btn-primary');
				_this.domElements.name.addClass('strikeout');
				_this.domElements.sets.addClass('strikeout');
				_this.domElements.reps.addClass('strikeout');
				_this.editButtonDOM.addClass('strikeout').removeAttr('data-toggle');
			}
			_this.domElements.deleteButton = $(_this.deleteButtonSection).append(_this.editButtonDOM, _this.deleteButtonDOM);
			_this.newTable = $(_this.domElements.row).append(_this.domElements.checkBoxHolder, _this.domElements.name, _this.domElements.sets, _this.domElements.reps, _this.domElements.deleteButton);
			$('tbody').append(_this.newTable);
			return _this.domElements.row;
		};

		this.handleEdit = function () {
			editID = _this.data.id;
			$('#editWorkoutName').val(_this.data.workoutName);
			$('#editSets').val(_this.data.defaultSets);
			$('#editReps').val(_this.data.reps);
		};

		//es6
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
		};
		this.completeSets = this.completeSets.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	_createClass(WorkoutRecord, [{
		key: "getData",
		value: function getData() {
			return this.data;
		}
	}, {
		key: "handleDelete",
		value: function handleDelete() {
			var deleteConfirm = confirm('Are you sure you want to remove this workout?');
			if (deleteConfirm) {
				this.deleteCallback(this);
				this.domElements.row.remove();
				this.countCallback();
				return;
			} else {
				return;
			}
		}
	}]);

	return WorkoutRecord;
}();