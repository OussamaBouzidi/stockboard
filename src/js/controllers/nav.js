(function() {
  angular.module('stockboard.controllers.nav', [])
  .controller('NavCtrl', function($scope, $state, UserService, StockHistoryService) {
    $scope.loggedIn = UserService.loggedIn;
    UserService.getCurrentUser()
    .success(function(data) {
      UserService.currentUserData = data;
      UserService.loggedIn = true;
      $scope.loggedIn = UserService.loggedIn;
    })
    .catch(function(error) {
      console.error(error);
      UserService.loggedIn = false;
    })
    $scope.logout = function() {
      UserService.logoutCurrentUser()
      .success(function(data) {
        console.log('successfully logged out');
        $scope.loggedIn = UserService.loggedIn;
        $state.go('home');
      })
      .catch(function(error) {
        console.log('failed logging out');
      })
    }
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
        hash: userData._id + this.symbol
      }
      UserService.addStockPurchase(purchase)
      .success(function(data) {})
      .catch(function(error) { console.error(error); })
      UserService.addStockWatch(watch)
      .success(function(data) {
        $state.reload();
      })
      .catch(function(error) {
        console.error(error);
      })      
    }
    $scope.saveStockWatch = function(watch) {
      var userData = UserService.currentUserData;
      watch.user = userData.displayName;
      watch.hash = userData._id + watch.symbol
      UserService.addStockWatch(watch)
      .success(function(data) {
        $state.reload();
      })
      .catch(function(error) {
        console.error(error);
      })
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
