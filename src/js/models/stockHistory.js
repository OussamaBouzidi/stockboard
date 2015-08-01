(function() {
  angular.module('stockboard.models.stockHistory', [])
  .factory('StockHistoryService', function($http) {
    return {
      getStockHistory: function(stock) {
        return $http.get();
      }
    }
  });
})();
