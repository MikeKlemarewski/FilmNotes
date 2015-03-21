// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('filmApp',
[
    'ionic',
    'filmApp.controllers',
    'services',
    'firebase',
    'ngCordova'
])

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

  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'Login'
    })

    .state('logout', {
        url: '/logout',
        templateUrl: 'templates/login.html',
        controller: 'Login'
    })

    .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'Signup'
    })

    .state('tabs', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/partials/tabs.html'
    })

    .state('tabs.main', {
        url: '/main',
        views: {
            'main-tab': {
                templateUrl: 'templates/main.html',
                controller: 'Main'
            }
        }
    })

    .state('tabs.currentRoll', {
        url: '/current-roll',
        views: {
            'film-tab': {
                templateUrl: 'templates/current-roll.html',
                controller: 'CurrentRoll'
            }
        }
    })

    .state('tabs.capture', {
        url: '/capture',
        views: {
            'film-tab': {
                templateUrl: 'templates/capture.html',
                controller: 'Capture'
            }
        }
    })

    .state('tabs.edit', {
        url: '/edit/:id',
        views: {
            'film-tab': {
                templateUrl: 'templates/edit.html',
                controller: 'ExposureEdit'
            }
        }
    })
})

.directive('exposureFields', function() {
    return {
        templateUrl: 'templates/partials/exposure-fields.html'
    }
});
