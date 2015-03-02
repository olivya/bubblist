bubblist.controller('mainController', function($scope, Tasks, $location, $timeout) {

	$scope.message = 'Controller is working!';
	$scope.taskList = Tasks.all();

	$scope.checkForTasks = function (){
		if ($scope.taskList.length === 0) {
				$scope.noTasks = true;
			}
		else $scope.noTasks = false;
	};

	$scope.checkForTasks();

	//DELETE TASK:
	$scope.deleteTask = function (i){ //i = $index from home.html
    	if (confirm("Are you sure you want to delete this task?") == true) {
	 		$scope.taskList[i] = null;

	 		var items = document.querySelectorAll('.tasky');
	 		for (var j=0, length = $scope.taskList.length; j <= length - 1; j++) {
	 			if ($scope.taskList[j] === null) { //ensure task[j] hasn't already been deleted (to avoid error)
	 				$(items[j]).addClass("deleted");
	 			}
	 		}

			$scope.checkForTasks();
		}
   };

	//STEP 1: ADD TASK:
	$scope.addTask = function(){
		if($scope.addTaskForm.$valid) {
			$scope.taskList.push(
				{
					task:$scope.newTask,
					editing:false
				});
			$scope.newTask = "";
			$scope.checkForTasks();
			$('.text-feedback').html(maxChars);
		}
		else {
			alert("Please enter your task");
		}
		setTimeout($scope.iterateTasks, 5);
	};

	//STEP 2: ADD "TASKY" CLASS
	$scope.iterateTasks = function (){
		$( "li > div" ).addClass( "tasky" );
		setTimeout($scope.toggleDraggability, 5);
	};
	


	//=============================================================================
	//====== HAMMER.JS ============================================================
	var mc = new Hammer.Manager(document.body);
	mc.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );


	mc.on("doubletap", function(ev) {
  	//call the method we attached to the global object 'fooControllerPublic'
  		mainControllerPublic.click(ev.target.id, ev.type);
  		console.log(ev.target.id);
	});

	mainControllerPublic.click = function(i, eventType) {
   	//$scope.taskList[i].editing = !$scope.taskList[i].editing;
   	$scope.taskList[i].editing = !$scope.taskList[i].editing;
   	$scope.$apply();
	}
	//=============================================================================



	//STEP 3: MAKE DRAGGABLE
	$scope.toggleDraggability = function (){
		var items = document.querySelectorAll('.tasky');

		for (var i=0, length = $scope.taskList.length; i <= length - 1; i++) {	
			if($scope.taskList[i] != null) { //if this task is NOT null
				var task = items[i];
				//DRAGGABILLY.JS
				var draggie = new Draggabilly( task, {
		    		handle: '.handle'
		    	});
			}
		};
	};

	$scope.toggleEditMode = function (i){
		$scope.taskList[i].editing = !$scope.taskList[i].editing;
		//Begin character counter tutorial reference:
		//Part 1: http://www.youtube.com/watch?v=13bceSHothY
		//Part 2: http://www.youtube.com/watch?v=BqcI0N87Xzw
		$('.edit-feedback').html(maxChars - $('.edit-box').val().length);
		$('.edit-box').keyup(function() {
			var curCharsEdit = $('.edit-box').val().length;
			var charsRemainingEdit = maxChars - curCharsEdit;
			$('.edit-feedback').html(charsRemainingEdit);
		});
		//End character counter tutorial reference
	};

	//Begin character counter tutorial reference (again):
	//Part 1: http://www.youtube.com/watch?v=13bceSHothY
	//Part 2: http://www.youtube.com/watch?v=BqcI0N87Xzw
	var maxChars = 100;
	$('.text-feedback').html(maxChars);
	$('.task-input').keyup(function() {
		var curChars = $('.task-input').val().length;
		var charsRemaining = maxChars - curChars;
		$('.text-feedback').html(charsRemaining);
	});
	//End character counter tutorial reference
});