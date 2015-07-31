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
        .state('dashboard.portfolio', {
          url: '/portfolio',
          templateUrl: 'templates/dashboard-portfolio.html'
        })
        .state('dashboard.stocks', {
          url: '/stocks',
          templateUrl: 'templates/dashboard-stocks.html'
        })
        .state('dashboard.analytics', {
          url: '/analytics',
          templateUrl: 'templates/dashboard-analytics.html'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
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
