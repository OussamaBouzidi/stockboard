(function() {
  angular.module('stockboard.models.stockPrice', [])
  .factory('StockPriceService', function($http) {
    return {
      getStockPrice: function (stock) {
        return $http.get();
      }
    }
  });
})();
