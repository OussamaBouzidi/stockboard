(function() {
  angular.module('stockboard.controllers.nav', [])
  .controller('NavCtrl', function($scope) {
    console.log('This nav should be on every page.');
    $scope.loggedIn = true;
    $scope.recordStockWatch = function() {
      console.log('recorded watch');
      $scope.recordWatch = true;
      $scope.recordPurchase = false;
    }
    $scope.recordStockPurchase = function() {
      console.log('recorded purchase');
      $scope.recordPurchase = true;
      $scope.recordWatch = false;
    }
  });
})();
