(function() {
  angular.module('stockboard.controllers.dashboard', [])
  .controller('DashboardCtrl', function($scope, $state, UserService) {
    $scope.saveStockPurchase = function(purchase) {
      // grab user data to add to purchase object
      var userData = UserService.currentUserData;
      // add user data to purchase object
      purchase.user = userData.displayName;
      purchase.sharesSold = 0;
      purchase.status = 'Purchased';
      // create watch object with user data and purchase data
      var watch = {
        name: purchase.name,
        symbol: purchase.symbol,
        user: userData.displayName,
        hash: userData._id + purchase.symbol
      }
      UserService.addStockPurchase(purchase)
      .success(function(data) {})
      .catch(function(error) {
        console.error(error);
      })
      UserService.addStockWatch(watch)
      .success(function(data) {
        $state.reload();
      })
      .catch(function(error) {
        console.error(error);
      })
      $scope.recordPurchase = null;
      $scope.recordWatch = null;
      $scope.purchase = {};
    }
    $scope.saveStockWatch = function(watch) {
      var userData = UserService.currentUserData;
      watch.user = userData.displayName;
      watch.hash = userData._id + watch.symbol
      UserService.addStockWatch(watch)
      .success(function(data) {
        watch = {};
        $state.reload();
      })
      .catch(function(error) {
        console.error(error);
      })
      $scope.recordPurchase = null;
      $scope.recordWatch = null;
      $scope.watch = {};
    }
    // Add Modal state rendering logic
    $scope.recordStockWatch = function() {
      $scope.recordWatch = true;
      $scope.recordPurchase = false;
    }
    $scope.recordStockPurchase = function() {
      $scope.recordPurchase = true;
      $scope.recordWatch = false;
    }
    $scope.modalClose = function() {
      $scope.recordPurchase = null;
      $scope.recordWatch = null;
    }
  });
})();
