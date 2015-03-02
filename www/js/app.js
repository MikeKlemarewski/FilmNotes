// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase', 'starter.controllers', 'services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'templates/main.html',
      controller: 'Main'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'Login'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'Signup'
    })

    .state('capture', {
      url: '/capture',
      templateUrl: 'templates/capture.html',
      controller: 'Exposures'
    })

    .state('edit', {
        url: '/edit/:id',
        templateUrl: 'templates/edit.html',
        controller: 'ExposureEdit'
    })

    .state('currentRoll', {
      url: '/current-roll',
      templateUrl: 'templates/current-roll.html',
      controller: 'CurrentRoll'
    })
})

.directive('exposureFields', function() {
    return {
        templateUrl: 'templates/partials/exposure-fields.html'
    }
});
