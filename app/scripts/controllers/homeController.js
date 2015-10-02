'use strict';

/**
 * @ngdoc function
 * @name Sochat.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('Sochat')
  .controller('HomeController', function($scope, ExampleService, $firebaseObject, $timeout) {

    console.log("home controller");

    var rootRef = new Firebase('https://incandescent-heat-3271.firebaseio.com/');

    $scope.doStuff = function () {

      var sochatMessages = rootRef.child('sochatmsgs');

      var message = {
        name : "diego",
        msg : "Hello world"
      };

      sochatMessages.push(message);

    };

    var sochatMessages = rootRef.child('sochatmsgs');

    sochatMessages.on('value', function (snapshot) {
      $timeout(function () {
        console.log(snapshot.val());

        $scope.messages = snapshot.val();

        snapshot.forEach(function (item) {
          console.log(item.val())
        });




        /*$rootScope.courses = snapshot.val();
        $scope.courses = snapshot.val();
        console.log("Setting scope.courese...");
        console.log($scope.courses);*/
      });

    });

    console.log();





    $scope.myHTML = null;

    // just an example...
    $scope.fetchRandomText = function() {
      ExampleService.doSomethingAsync()
        .then(ExampleService.fetchSomethingFromServer)
        .then(function(response) {
            $scope.myHTML = response.data.text;
            // close pull to refresh loader
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.fetchRandomText();

  });
