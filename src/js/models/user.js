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
    this.addStockPurchase = function(userId, purchase) {
      return $http.post('/users/' + userId + '/purchases', purchase);
    };
    this.addStockWatch = function(userId, watch) {
      return $http.post('/users/' + userId + '/watches', watch);
    };
    this.getAllUserStockPurchases = function(userId) {
      return $http.get('/users/' + userId + '/purchases');
    };
    this.getAllUserStockWatches = function(userId) {
      return $http.get('/users/' + userId + '/watches');
    };
    // this.editPurchase = function() {
    //   return $http.patch('/');
    // }
    // this.deletePurchase = function() {
    //   return $http.delete('/');
    // }
    // this.deleteWatch = function() {
    //   return $http.delete('/');
    // }
  });
})();
