(function() {
  angular.module('stockboard.controllers.nav', [])
  .controller('NavCtrl', function($scope, $state, UserService, StockHistoryService) {
    $scope.loggedIn = true;
    UserService.getCurrentUser()
    .success(function(data) {
      UserService.currentUserData = data;
      UserService.loggedIn = true;
    })
    .catch(function(error) {
      console.error(error);
      UserService.loggedIn = false;
    })

    $scope.logout = function() {
      UserService.logoutCurrentUser()
      .success(function(data) {
        console.log('successfully logged out');
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
      console.log('running');
      $scope.recordPurchase = null;
      $scope.recordWatch = null;
    }
    $scope.saveStockPurchase = function(purchase) {
      console.log(purchase);
      var user;
      UserService.addStockPurchase(user, purchase)
      .success(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        console.error(error);
      })
    }
    $scope.saveStockWatch = function(watch) {
      console.log(watch);
      var userData = UserService.currentUserData;
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
