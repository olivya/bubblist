bubblist.controller('mainController', function($scope, Tasks, $location, $timeout) {

	$scope.message = 'Controller is working!';
	$scope.taskList = Tasks.all();

	$scope.checkForTasks = function (){
		if ($scope.taskList.length === 0) {
				$scope.noTasks = true;
			}
		else $scope.noTasks = false;
	};

	$scope.checkForTasks(); //initial check for tasks

	//DELETE TASK:
	$scope.deleteTask = function (i){ //i = $index from home.html
    	if (confirm("Are you sure you want to delete this task?") == true) {
	 		// var index = $scope.taskList.map(
	 		// 	function(i) {
	 		// 		if($scope.taskList[i] != null) { //if hasn't been deleted...
				// 			return i.task; //...return i.task
				// 		}
				// 	}).indexOf($scope.taskList[i].task); //match task to array to find index

	 		// console.log("Task",$scope.taskList[i].task,"with index of",index,"is being deleted...")
	 		//$scope.taskList.splice(i,1);
	 		$scope.taskList[i] = null;

	 		//go through and apply deleted class to deleted task...
	 		var items = document.querySelectorAll('.tasky');
	 		for (var j=0, length = $scope.taskList.length; j <= length - 1; j++) {
	 			if ($scope.taskList[j] === null) { //ensure task[j] hasn't already been deleted (to avoid error)
	 				$(items[j]).addClass("deleted");
	 			}
	 		}
	 		// if($scope.taskList[index] != null) {
	 		// 	console.log("...task",$scope.taskList[index].task,"is now at index",index);
	 		// } else {
	 		// 	console.log("...and there are no more tasks after it");
	 		// }
			$scope.checkForTasks(); //check in case user deleted last/only task
			//console.log("deleteTask() GOOD");
		}
   };

	//STEP 1: ADD TASK:
	$scope.addTask = function(){
		if($scope.addTaskForm.$valid) {
			$scope.taskList.push( //pushes to taskList array
				{
					task:$scope.newTask,
					editing:false
				});

			// var newTaskIndex = $scope.taskList.map(
			// 	function(i) {
			// 		if($scope.taskList[i] != null) {
			// 			return i.task;
			// 		}
			// 	}).indexOf($scope.newTask);
			// console.log("Index of", $scope.newTask + " is",newTaskIndex);

			$scope.newTask = ""; //empties textarea on submit
			$scope.checkForTasks(); //so noTasks bool will turn false
		}
		else {
			alert("Please enter your task");
		}
		setTimeout($scope.iterateTasks, 5);
		// console.log("STEP 1 GOOD");
	};

	//STEP 2: ADD "TASKY" CLASS
	$scope.iterateTasks = function (){
		$( "li > div" ).addClass( "tasky" );
		setTimeout($scope.toggleDraggability, 5);
		// console.log("STEP 2 GOOD");
	};
	
	//STEP 3: MAKE DRAGGABLE
	$scope.toggleDraggability = function (){
		var items = document.querySelectorAll('.tasky');

		for (var i=0, length = $scope.taskList.length; i <= length - 1; i++) {	
			if($scope.taskList[i] != null) { //if this task is NOT null
				var task = items[i];
				var draggie = new Draggabilly( task, {
		    		handle: '.handle'
		    	});
			}
			//else {
			// 	draggie.destroy();
			// 	console.log("destroy");
			// }
		};
		// console.log("STEP 3 GOOD");
	};

	$scope.toggleEditMode = function (i){
		$scope.taskList[i].editing = !$scope.taskList[i].editing;
	};
});