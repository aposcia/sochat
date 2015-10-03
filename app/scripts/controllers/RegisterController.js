/*global Firebase*/
(function (angular) {
    'use strict';

    angular.module('Sochat')
        .controller('RegisterController', function ($scope, FBURL, $window, $firebase, $location, $firebaseAuth, $ionicPopup) {
            $scope.mesg = 'Hello';
            var firebaseObj = new Firebase(FBURL);
            var auth = $firebaseAuth(firebaseObj);


            $scope.registerUser = [];

            var showError = function (message) {
                console.log(message);
                var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: message
                });
                alertPopup.then(function (res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            };

            $scope.signUp = function () {


                var errors = [];
                if ($scope.registerUser.email === '' || $scope.registerUser.email == null) {
                    showError("Insert email!")
                }
                if ($scope.registerUser.password === '' || $scope.registerUser.password == null) {
                    showError('Password must not be blank');
                }
                else if ($scope.registerUser.password !== $scope.registerUser.confirmPassword) {
                    showError('Passwords must match');
                }

                if (errors.length > 0) {
                    $scope.errors = errors;
                    return;
                } else {
                    var email = $scope.registerUser.email;
                    var password = $scope.registerUser.password;
                    if (email && password) {

                        var newUser = {
                            email: email,
                            password: password
                        };

                        auth.$createUser(newUser)
                            .then(function () {
                                // do things if success
                                console.log('User creation success');
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Thank you!',
                                    template: 'Welcome on board, ' + newUser.email + "!"
                                });
                                alertPopup.then(function (res) {
                                    console.log('Thank you for not eating my delicious ice cream cone');
                                });
                                $location.path('/home');
                            }, function (error) {
                                // do things if failure
                                console.log(error);
                                $scope.regError = true;
                                $scope.regErrorMessage = error.message;
                            });
                    }
                }
            }
        });

}(window.angular));
