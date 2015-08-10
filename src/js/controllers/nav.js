(function() {
  angular.module('stockboard.controllers.nav', [])
  .controller('NavCtrl', function($scope, $state, UserService, StockHistoryService, FirebaseAuthService) {
    UserService.getCurrentUser()
    .success(function(data) {
      console.log(data);
      UserService.currentUserData = data;
      if (data) {
        UserService.loggedIn = true;
      } else {
        $scope.loggedIn = false;
      }
      $scope.loggedIn = UserService.loggedIn;
    })
    .catch(function(error) {
      console.error(error);
      UserService.loggedIn = false;
    })
    $scope.logout = function() {
      UserService.logoutCurrentUser()
      .success(function(data) {
        $scope.loggedIn = UserService.loggedIn;
        swal('', 'Successfully logged out!', 'success');
        $state.go('home');
      })
      .catch(function(error) {
        swal('', 'Failed to log out!', 'error');
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
        hash: userData._id + purchase.symbol
      }
      UserService.addStockPurchase(purchase)
      .success(function(data) {
        swal('', 'You have sucessfully purchased ' + purchase.name + ' stock!', 'success');
        $state.reload();
      })
      .catch(function(error) {
        swal('', 'Purchase failed!', 'error');
      })
      UserService.addStockWatch(watch)
      .success(function(data) {})
      .catch(function(error) {
        console.error(error);
      })
      $scope.recordPurchase = null;
      $scope.recordWatch = null;
      $scope.purchase = {};
      $('#myModal').modal('hide');
    }
    $scope.saveStockWatch = function(watch) {
      var userData = UserService.currentUserData;
      watch.user = userData.displayName;
      watch.hash = userData._id + watch.symbol
      UserService.addStockWatch(watch)
      .success(function(data) {
        swal('', 'You are now watching ' + watch.name + ' !', 'success');
        $state.reload();
      })
      .catch(function(error) {
        swal('', 'Failed to watch stock!', 'error');
        console.error(error);
      })
      $scope.recordPurchase = null;
      $scope.recordWatch = null;
      $scope.watch = {};
      $('#myModal').modal('hide');
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
      $scope.purchase = {};
      $scope.watch = {};
    }
  });
})();
