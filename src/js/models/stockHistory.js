(function() {
  angular.module('stockboard.models.stockHistory', [])
  .factory('StockHistoryService', function($http, BASE_URL) {
    return {
      getStockHistory: function(stock) {
        return $http.get();
      }
    }
  });
})();
