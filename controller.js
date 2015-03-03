bubblist.controller('mainController', function($scope, Tasks, Colours, $location, $timeout) {

	// $scope.message = 'Task:';
	$scope.taskList = Tasks.all();
	$scope.colourList = Colours.all();

	var i = 0;
	var colour;
	var colourIndex = 0;

	var zIndex = 0;
	var setZ;
	var holdSetZ;

	var space = 0;
	var increaseSpace;

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
	 		setTimeout($(items[j]).addClass("deletedFinal"),600);

			$scope.checkForTasks();
		}
   };

	//STEP 1: ADD TASK:
	$scope.addTask = function(){
		if($scope.addTaskForm.$valid) {
			$scope.taskList.push(
				{
					task:$scope.newTask,
					editing:false,
					index:i
				});
			// i = $scope.taskList.map(function(i) { return i.i; }).indexOf($scope.newTask);
			// console.log("i "+i);
			$scope.newTask = "";
			$scope.checkForTasks();
			$('.text-feedback').html(maxChars);
		}
		else {
			alert("Please enter your task");
		}
		setTimeout($scope.toggleMenu,100);
		setTimeout($scope.iterateTasks, 5);
		setTimeout($scope.setStyle,5);
	};


	$scope.setStyle = function(){
		// setZ = $('#task'+i).css("z-index",zIndex);
		// // console.log("zIndex is "+zIndex + " and z-index is "+$("#task"+i).css("z-index"));
		// zIndex+=10; //NEXT z
		// console.log("setting style");
		
		setZ = $('#task'+i).css("z-index",zIndex);
		// console.log("zIndex is "+zIndex + " and z-index is "+$("#task"+i).css("z-index"));
		zIndex+=10; //NEXT z
		// console.log("setting z");
		
		increaseSpace = $('#task'+i).css("top",space+"px");
		space += 40; //NEXT top space

		if(colourIndex < $scope.colourList.length) {
				// console.log("i is "+i); console.log("colourIndex is "+colourIndex);
			 	colour = $('#task'+i).css("background-color",$scope.colourList[colourIndex]);
			 	colourIndex++;
			}
			else if (colourIndex >= $scope.colourList.length) {
				colourIndex=0;
				// console.log("fired reset"); console.log("i is "+i); console.log("colourIndex is "+colourIndex);
				colour = $('#task'+i).css("background-color",$scope.colourList[colourIndex]);
				colourIndex++;
			}
		i++;
	};

	//STEP 2: ADD "TASKY" CLASS
	$scope.iterateTasks = function (){
		$( "li > div" ).addClass( "tasky" );
		// console.log("NEXT zIndex is "+zIndex);
		setTimeout($scope.toggleDraggability, 5);
	};
	
	//STEP 3: MAKE DRAGGABLE
	$scope.toggleDraggability = function (){
		var items = document.querySelectorAll('.tasky');

		for (var i=0, length = $scope.taskList.length; i <= length - 1; i++) {	
			if($scope.taskList[i] != null) { //if this task is NOT null
				var task = items[i];
				//DRAGGABILLY.JS
				var draggie = new Draggabilly( task, {
		    		handle: '.task'
		    	});
			}
		};
	};

	$scope.toggleEditMode = function (i){
		$scope.taskList[i].editing = !$scope.taskList[i].editing;
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

	//TOGGLE MENU + ANIM:
	var menuOpen = false;
	var buttonShifted = false;

	$scope.toggleMenu = function (){
		if(helpMenuOpen){
			$scope.toggleHelp();
		}

		if(!menuOpen) {
			$( ".add-task-form" ).addClass( "menu-open" );
			$( ".toggle-menu-button" ).addClass( "shift-down" );
			$( ".toggle-menu-button" ).find($(".fa")).addClass('fa-spin');
			$( ".toggle-help-button" ).addClass( "shift-help-down" );
			
			menuOpen = true;
			buttonShifted = true;

			setTimeout(function () { if(buttonShifted = true) {
				$( ".toggle-menu-button" ).find($(".fa")).removeClass('fa-spin');
				$( ".toggle-menu-button" ).find($(".fa")).removeClass('fa-plus').addClass('fa-times');
			}}, 745);
		}

		else if(menuOpen) {
			$( ".add-task-form" ).removeClass( "menu-open" );
			$( ".toggle-menu-button" ).removeClass( "shift-down" );
			$( ".toggle-menu-button" ).find($(".fa")).addClass('fa-spin');
			$( ".toggle-help-button" ).removeClass( "shift-help-down" );

			setTimeout(function () { if(buttonShifted = true) {
				$( ".toggle-menu-button" ).find($(".fa")).removeClass('fa-spin');
				$( ".toggle-menu-button" ).find($(".fa")).removeClass('fa-times').addClass('fa-plus');
			}}, 760);

			menuOpen = false;
			buttonShifted = false;
		}
	};

//TOGGLE HELP + ANIM:
var helpMenuOpen = false;
var helpButtonShifted = false;

	$scope.toggleHelp = function (){
		if(menuOpen){
			$scope.toggleMenu();
		}

		if(!helpMenuOpen) {
			console.log("opening");
			$( ".help-form" ).addClass( "help-open" );
			$( ".toggle-help-button" ).addClass( "shift-help" );
			$( ".toggle-help-button" ).find($(".fa")).addClass('fa-spin');
			
			helpMenuOpen = true;
			helpButtonShifted = true;

			setTimeout(function () { if(helpButtonShifted = true) {
				$( ".toggle-help-button" ).find($(".fa")).removeClass('fa-spin');
				$( ".toggle-help-button" ).find($(".fa")).removeClass('fa-question').addClass('fa-times');
			}}, 745);
		}
		else if(helpMenuOpen) {
			console.log("closing");
			$( ".help-form" ).removeClass( "help-open" );
			$( ".toggle-help-button" ).removeClass( "shift-help" );
			$( ".toggle-help-button" ).find($(".fa")).addClass('fa-spin');

			setTimeout(function () { if(helpButtonShifted = true) {
				$( ".toggle-help-button" ).find($(".fa")).removeClass('fa-spin');
				$( ".toggle-help-button" ).find($(".fa")).removeClass('fa-question').addClass('fa-question');
			}}, 760);

			helpMenuOpen = false;
			helpButtonShifted = false;
		}
	};

	//=============================================================================
	//====== HAMMER.JS ============================================================
	var mc = new Hammer.Manager(document.body);
	mc.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
	mc.add( new Hammer.Press({ event: 'hold', time: 750 }) );

	//DOUBLE TAP to toggle edit mode:
	mc.on("doubletap", function(ev) {
		console.log("Double tap detected on handle with id of",ev.target.id);
		doubleTapEdit.click(ev.target.id, ev.type);
		holdBringForward.click(ev.target.id, ev.type);
	});

	doubleTapEdit.click = function(i, eventType) {
   	if($scope.taskList[i] != undefined) {
   		$scope.taskList[i].editing = !$scope.taskList[i].editing;
   	}
   	$scope.$apply();
	}

	//HOLD for 0.75s to bring event to front:
	mc.on("hold", function(ev) {
		console.log("Hold detected on handle with id of",ev.target.id);
  		holdBringForward.click(ev.target.id, ev.type);
	});

	holdBringForward.click = function(i, eventType) {
   	holdSetZ = $('#task'+i).css("z-index",zIndex);
   	zIndex += 10;
   	$scope.$apply();
	}
	//=============================================================================
});