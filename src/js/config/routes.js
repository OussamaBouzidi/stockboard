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
        .state('dashboard.profile', {
          url: 'profile',
          templateUrl: 'templates/dashboard-profile.html',
          controller: 'DashboardProfileCtrl'
        })
        .state('dashboard.portfolio', {
          url: 'portfolio',
          templateUrl: 'templates/dashboard-portfolio.html',
          controller: 'DashboardPortfolioCtrl'
        })
        .state('dashboard.stocks', {
          url: 'stocks',
          templateUrl: 'templates/dashboard-stocks.html',
          controller: 'DashboardStocksCtrl'
        })
        .state('dashboard.analytics', {
          url: 'analytics',
          templateUrl: 'templates/dashboard-analytics.html',
          controller: 'DashboardAnalyticsCtrl'
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
