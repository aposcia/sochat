(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name Sochat.controller:HomeController
     * @description
     * # HomeController
     */
    angular.module('Sochat')
        .controller('HomeController', function ($scope, ExampleService, $firebaseObject, $timeout) {

            console.log("home controller");

            var rootRef = new Firebase('https://sochat.firebaseio.com/');

            $scope.addMessage = function () {
                var sochatMessages = rootRef.child('messages');

                var message = {
                    name: "diego",
                    msg: "Hello world"
                };

                sochatMessages.push(message);
            };

            $scope.deleteMessage = function (msgIdToDelete){

                var sochatMessages = rootRef.child('messages').child(msgIdToDelete);
                sochatMessages.remove();
            };

            var sochatMessages = rootRef.child('messages');

            sochatMessages.on('value', function (snapshot) {
                $timeout(function () {
                    console.log(snapshot.val());

                    $scope.messages = snapshot.val();

                    snapshot.forEach(function (item) {
                        console.log(item.val());
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
            $scope.fetchRandomText = function () {
                /*ExampleService.doSomethingAsync()
                    .then(ExampleService.fetchSomethingFromServer)
                    .then(function (response) {
                        $scope.myHTML = response.data.text;
                        // close pull to refresh loader
                        $scope.$broadcast('scroll.refreshComplete');
                    });*/
                $scope.myHTML = "Tagada";
            };

            $scope.fetchRandomText();
        });
})();