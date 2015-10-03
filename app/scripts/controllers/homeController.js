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

            $scope.messages = [];
            var rootRef = new Firebase('https://sochat.firebaseio.com/');

            $scope.deleteMessage = function (msgIdToDelete){
                var sochatMessages = rootRef.child('messages').child(msgIdToDelete);
                sochatMessages.remove();
            };

            var sochatMessages = rootRef.child('messages');

            var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                var lat  = position.coords.latitude;
                var long = position.coords.longitude;
                console.log("lat : " + lat + ", long: " + long);


                var sochatMessagesPositions = rootRef.child('messagesPositions');
                var geoFireMsg = new GeoFire(sochatMessagesPositions);
                var geoQuery = geoFireMsg.query({
                    center: [position.coords.latitude, position.coords.longitude],
                    radius: 100
                });

                geoQuery.on("key_entered", function(key, location, distance) {
                    var messageId = key.split(":")[1];
                    sochatMessages.child(messageId).once("value", function(dataSnapshot) {
                        var message = dataSnapshot.val();
                        console.log(message);
                        $scope.messages.push(message);
                    });
                }, function(error) {
                    console.log("Error2" + error);
                });

                geoQuery.on("key_exited", function(key, location, distance) {
                    var messageId = key.split(":")[1];
                    console.log("message not visible anymore: "+ messageId);

                });


            }, function(error) {
                console.log("Error" + error);
            });




            /*sochatMessages.on('value', function (snapshot) {
                $timeout(function () {
                    console.log(snapshot.val());

                    $scope.messages = snapshot.val();

                });

            });*/

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

                    var sochatMessagesPositions = rootRef.child('messagesPositions');
                    var geoFire = new GeoFire(sochatMessagesPositions);

                    geoFire.set("location:"+sochatMessage.key(), [lat, long]).then(function() {
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