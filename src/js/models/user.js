(function() {
  angular.module('stockboard.models.user', [])
  .service('UserService', function($http, BASE_URL) {
    this.getUser = function(user) {
      return $http.get('/users/' + user);
    };
    this.addStockPurchase = function(user, purchase) {
      return $http.post('/users/' + user, purchase);
    };
    this.addStockWatch = function(user, watch) {
      return $http.post('/users/' + user, watch);
    };
    this.getCurrentUser = function() {
      return $http.get('/currentUser');
    };
    this.logoutCurrentUser = function() {
      $rootScope.currentUserData = {};
      $rootScope.currentUserData.loggedIn = false;
    };
    this.getAllUserStockPurchases = function() {
      return $http.get('/');
    };
    this.getAllUserStockWatches = function() {
      return $http.get('/');
    }
    this.editPurchase = function() {
      return $http.patch('/');
    }
    this.deletePurchase = function() {
      return $http.delete('/');
    }
    this.deleteWatch = function() {
      return $http.delete('/');
    }
  });
})();
