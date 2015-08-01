(function() {
  angular.module('stockboard.models.user', [])
  .factory('UserService', function($http) {
    return {
      getUser: function (user) {
        return $http.get();
      },
      addStockPurchase: function (user, purchase) {
        return $http.post();
      },
      addStockWatch: function (user, watch) {
        return $http.post();
      }
    }
  });
})();
