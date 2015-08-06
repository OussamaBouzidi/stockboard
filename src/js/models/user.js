(function() {
  angular.module('stockboard.models.user', [])
  .service('UserService', function($http, BASE_URL) {
    this.currentUserData;
    this.loggedIn = false;
    this.getCurrentUser = function() {
      return $http.get('/currentuser');
    };
    this.logoutCurrentUser = function() {
      this.currentUserData = {};
      this.loggedIn = false;
      return $http.get('/logout');
    };    
    this.addStockPurchase = function(purchase) {
      return $http.post('/purchases', purchase);
    };
    this.addStockWatch = function(watch) {
      return $http.post('/watches', watch);
    };
    this.getAllUserStockPurchases = function() {
      return $http.get('/purchases');
    };
    this.getAllUserStockWatches = function() {
      return $http.get('/watches');
    };
    // this.editPurchase = function() {
    //   return $http.patch('/');
    // }
    this.deleteStockPurchase = function(purchaseId) {
      return $http.delete('/purchases/' + purchaseId);
    }
    this.deleteStockWatch = function(watchId) {
      return $http.delete('/watches/' + watchId);
    }
    // this.sellStockPurchase = function(purchaseId) {
    //   return $http.patch('/purchases/' + purchaseId, )
    // }
  });
})();
