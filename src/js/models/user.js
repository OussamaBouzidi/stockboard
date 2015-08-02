(function() {
  angular.module('stockboard.models.user', [])
  .service('UserService', function($http) {
    this.getUser = function(user) {
      return $http.get('/users/' + user);
    };
    this.addStockPurchase = function(user, purchase) {
      return $http.post('/users/' + user, purchase);
    };
    this.addStockWatch = function(user, watch) {
      return $http.post('/users/' + user, watch);
    };
  });
})();
