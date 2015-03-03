var bubblist = angular.module('bubblist', ['ngRoute','ngAnimate']);

//=============================================================================
// TOUCH EVENT CONTROLLERS ====================================================
var doubleTapEdit = {};
var holdBringForward = {};
//=============================================================================

bubblist.config(function ($routeProvider,$locationProvider) {
    $routeProvider

    .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'mainController'
    })

    .otherwise({ redirectTo: '/' });
});

//Reference used for services:
//http://fdietz.github.io/recipes-with-angular-js/controllers/sharing-code-between-controllers-using-services.html
bubblist.factory("Tasks", function() {
  // var taskList = [{task:"test01"},{task:"test02"},{task:"test03"}]; //test values
  var taskList = [];
  return {
    all: function() {
      return taskList;
    },
  };
});

bubblist.factory("Colours", function() {
  var colourList = ['#1CBFBF','#FFCE35','#9135FF'];
  return {
    all: function() {
      return colourList;
    },
  };
});