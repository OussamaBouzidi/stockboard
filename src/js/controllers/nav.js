(function() {
  angular.module('stockboard.controllers.nav', [])
  .controller('NavCtrl', function($scope, UserService, StockHistoryService) {
    $scope.loggedIn = true;
    $scope.recordStockWatch = function() {
      $scope.recordWatch = true;
      $scope.recordPurchase = false;
    }
    $scope.recordStockPurchase = function() {
      $scope.recordPurchase = true;
      $scope.recordWatch = false;
    }
    $scope.modalClose = function() {
      console.log('running');
      $scope.recordPurchase = null;
      $scope.recordWatch = null;
    }
    $scope.saveStockPurchase = function(purchase) {
      console.log(purchase);
      
    }
    $scope.saveStockWatch = function(watch) {
      console.log(watch);
    }
  });
})();
