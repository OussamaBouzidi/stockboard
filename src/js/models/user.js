(function() {
  angular.module('stockboard.models.user', [])
  .service('UserService', function($http) {
    this.currentUserData;
    this.loggedIn = false;
    this.addUser = function(user) {
      return $http.post('/users', user);
    }
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
    this.editPurchase = function(purchaseId, edittedStock) {
      return $http.patch('/purchases/' + purchaseId, edittedStock);
    };
    this.deleteStockPurchase = function(purchaseId) {
      return $http.delete('/purchases/' + purchaseId);
    };
    this.deleteStockWatch = function(watchId) {
      return $http.delete('/watches/' + watchId);
    };
    this.sellStockPurchase = function(purchaseId, soldStock) {
      return $http.patch('/purchases/' + purchaseId, soldStock)
    };
  });
})();
