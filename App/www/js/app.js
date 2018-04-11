'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('appskeleton', [
    'ionic',
    'ngCordova',
    'ngCordovaOauth',
    'angular-md5',
    'countrySelect',
    'ngStorage',
    'ngGoogleMaps'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.constant("requrl","http://192.168.0.107:1234")
.constant("GOOGLE_CLIENT_ID","11067462844-4s6bjl47j6m7v2g4it1ndnfbgirk7m3g.apps.googleusercontent.com")
.constant("GOOGLE_API_KEY","AIzaSyA7-XiSE26yWofo9OO0Za34DrgU5q775o4")
.constant("FACEBOOK_APP_ID","1853899954884964")

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.navBar.alignTitle('center');
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
  })


  .state('app.main', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html',
        controller: 'AboutCtrl'
      }
    }
  })

  // .state('app.about', {
  //     url: '/about',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/about.html',
  //         controller:'AboutCtrl'
  //       }
  //     }
  //   })
  //   .state('app.login', {
  //     url: '/login',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/login.html',
  //         controller: 'LoginCtrl'
  //       }
  //     }
  //   })

  // .state('app.signup', {
  //   url: '/signup',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/signup.html',
  //       controller: 'SignupCtrl'
  //     }
  //   }
  // })

  // .state('app.profile', {
  //   cache:'false',
  //   url: '/profile',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/profile.html',
  //       controller: 'ProfileCtrl'
  //     }
  //   }
  // })

  // .state('app.forgotpassword', {
  //   url: '/forgotpassword',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/forgotpassword.html',
  //       controller: 'ForgotpasswordCtrl'
  //     }
  //   }
  // });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
