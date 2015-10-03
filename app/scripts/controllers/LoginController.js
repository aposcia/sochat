/*global Firebase*/
(function(angular) {
  'use strict';

  angular.module('Sochat')
    .controller('LoginController', function($scope, FBURL, $window, $firebase, $location, $firebaseAuth, $ionicPopup, CommonProp,$state) {

          var firebaseObj = new Firebase(FBURL);
          var loginObj = $firebaseAuth(firebaseObj);

          $scope.user = [];

          $scope.signIn = function() {
              var email = $scope.user.email;
              var password = $scope.user.password;
              loginObj.$authWithPassword({
                  email: email,
                  password: password
              })
                  .then(function(user) {
                      //Success callback
                      console.log('Authentication successful');
                      showPopup("Success!",'Welcome back, '+email+'!');
                      CommonProp.setUser(user.password.email);
                      console.log(CommonProp.getUser());
                      $state.go('app.profile');
                  }, function(error) {
                      //Failure callback
                      showPopup("Error!","login incorrect");
                      console.log('Authentication error');
                  });
          };

          var showPopup = function (title,message) {
              console.log(message);
              var alertPopup = $ionicPopup.alert({
                  title: title,
                  template: message
              });
              alertPopup.then(function (res) {
                  console.log('Thank you for not eating my delicious ice cream cone');
              });
          };

    });

}(window.angular));
