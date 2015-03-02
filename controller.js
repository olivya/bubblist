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
    		console.log("task \""+ $scope.taskList[i].task + "\" deleted");
    		$scope.taskList.splice(i,1);
    		// console.log($scope.taskList[0].task +" "+ $scope.taskList[1].task +" "+ $scope.taskList[2].task);
			$scope.checkForTasks(); //check in case user deleted last/only task:
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
			$scope.newTask = ""; //empties textarea on submit
			$scope.checkForTasks(); //check so noTasks bool will turn false
			//console.log($scope.taskList.length+" tasks");
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
		for (var i=0, length = $scope.taskList.length; i < length; i++){
			var task = items[i];
			var draggie = new Draggabilly( task, {
    		   handle: '.handle'
    		});
		};
		// console.log("STEP 3 GOOD");
	};

	$scope.toggleEditMode = function (i){
		$scope.taskList[i].editing = !$scope.taskList[i].editing;
		console.log($scope.taskList[i].editing);
		console.log($scope.taskList[i].task);
	};
});