/*global Firebase*/
(function(angular) {
  'use strict';

  angular.module('Sochat')
    .controller('ProfileController', function($scope, FBURL, $window, $firebase, $location, $firebaseAuth, $ionicPopup, CommonProp) {

          $scope.username = CommonProp.getUser();

    });

}(window.angular));
