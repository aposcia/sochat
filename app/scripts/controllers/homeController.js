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

                });

            });


            $scope.form = {
                object: "",
                text: ""
            };

            $scope.printMe = function(){
                var sochatMessages = rootRef.child('messages');

                var message = {
                    name: $scope.form.object,
                    msg: $scope.form.text
                };

                sochatMessages.push(message);
            }



        });
})();