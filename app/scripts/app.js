'use strict';

/**
 * @ngdoc overview
 * @name Sochat
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */

angular.module('Sochat', ['ionic', 'ngCordova', 'ngResource','firebase'])

  .run(function($ionicPlatform,$rootScope,CommonProp,$state) {

    $ionicPlatform.ready(function() {
      // save to use plugins here
    });

        //stateChange event
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

            if (toState.authRequired && CommonProp.getUser() == undefined ) { //Assuming the AuthService holds authentication logic
                // User isn’t authenticated
                $state.transitionTo("app.login");
                event.preventDefault();
            }
        });

  })

  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');

    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller: 'MainController'
      })
      .state('app.home', {
        url: '/home',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/home.html',
            controller: 'HomeController'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'templates/views/settings.html',
            controller: 'SettingsController'
          }
        }
      })
        .state('app.login', {
            url: '/login',
            cache: true,
            views: {
                'viewContent': {
                    templateUrl: 'templates/views/login.html',
                    controller: 'LoginController'
                }
            }
        }).state('app.signup', {
            url: '/signup',
            cache: true,
            views: {
                'viewContent': {
                    templateUrl: 'templates/views/register.html',
                    controller: 'RegisterController'
                }
            }
        }).state('app.profile', {
            url: '/profile',
            cache: true,
            views: {
                'viewContent': {
                    templateUrl: 'templates/views/profile.html',
                    controller: 'ProfileController'
                }
            },
            authRequired: true

        });


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/app/home');

  }).constant('FBURL', 'https://sochat.firebaseio.com/')
    .service('CommonProp', function() {
        var user = null;
        return {
            getUser: function() {
                return this.user;
            },
            setUser: function(value) {
                console.log("Setting user..." +value);
                this.user = value;
            }
        };
    });


