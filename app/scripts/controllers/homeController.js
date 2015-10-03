(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name Sochat.controller:HomeController
     * @description
     * # HomeController
     */
    angular.module('Sochat')
        .controller('HomeController', function ($scope, ExampleService, $firebaseObject, $timeout, $cordovaGeolocation) {

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

            $scope.sendMessage = function() {
                var sochatMessages = rootRef.child('messages');

                var posOptions = {timeout: 1000, enableHighAccuracy: true};
                $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                    var lat  = position.coords.latitude;
                    var long = position.coords.longitude;
                    console.log("lat: " + lat + ", long: " + long);

                    var message = {
                        name: $scope.form.object,
                        msg: $scope.form.text
                    };

                    var sochatMessage = sochatMessages.push(message);
                    var geoFire = new GeoFire(sochatMessage);

                    geoFire.set("location", [lat, long]).then(function() {
                        console.log("Provided key has been added to GeoFire");
                    }, function(error) {
                        console.log("Error: " + error);
                    });

                }, function(error) {
                    console.log("Error" + error);
                });

            };

        });
})();