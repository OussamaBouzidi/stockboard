(function() {
  'use strict';

  angular.module('stockboard.controllers', [
    'stockboard.controllers.home',
    'stockboard.controllers.nav',
    'stockboard.controllers.login',
    'stockboard.controllers.register',
    'stockboard.controllers.dashboard',
    'stockboard.controllers.dashboardPurchases',
    'stockboard.controllers.dashboardPortfolio',
    'stockboard.controllers.dashboardStocks',
    'stockboard.controllers.dashboardAnalytics'
  ]);
})();
