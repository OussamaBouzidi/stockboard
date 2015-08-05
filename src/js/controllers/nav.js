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
    $scope.saveStockPurchase = function(purchase) {
      var userData = UserService.currentUserData;
      purchase.user = userData.displayName
      UserService.addStockPurchase(userData._id, purchase)
      .success(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        console.error(error);
      })
    }
    $scope.saveStockWatch = function(watch) {
      var userData = UserService.currentUserData;
      watch.user = userData.displayName
      UserService.addStockWatch(userData._id, watch)
      .success(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        console.error(error);
      })
    }
  });
})();
