(function() {
  angular.module('stockboard.models.user', [])
  .service('UserService', function($http, BASE_URL) {
    this.currentUserData;
    this.loggedIn;
    // this.addStockPurchase = function(user, purchase) {
    //   return $http.post('/users/' + user, purchase);
    // };
    // this.addStockWatch = function(watch) {
    //   return $http.post('/users/' + user, watch);
    // };
    this.getCurrentUser = function() {
      return $http.get('/currentuser');
    };
    this.logoutCurrentUser = function() {
      this.currentUserData = {};
      this.loggedIn = false;
      return $http.get('/logout');
    };
    this.getAllUserStockPurchases = function() {
      return $http.get('/');
    };
    this.getAllUserStockWatches = function() {
      return $http.get('/');
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
