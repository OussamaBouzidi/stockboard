(function() {
  angular.module('stockboard.models.user', [])
  .factory('UserService', function($http) {
    return {
      getUser: function (user) {
        return $http.get('/users/' + user);
      },
      addStockPurchase: function (user, purchase) {
        return $http.post('/users/' + user, purchase);
      },
      addStockWatch: function (user, watch) {
        return $http.post('/users/' + user, watch);
      }
    }
  });
})();
