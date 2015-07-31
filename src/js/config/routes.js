(function() {
  'use strict';

  angular.module('stockboard.config.routes', [])
    .config(function($urlRouterProvider, $locationProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        })
        .state('dashboard', {
          url: '/dashboard/:hash',
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .state('register', {
          url: '/register',
          templateUrl: 'templates/registration.html',
          controller: 'RegisterCtrl'
        });

      $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
      });

      $locationProvider.hashPrefix('!');

    });
})();
