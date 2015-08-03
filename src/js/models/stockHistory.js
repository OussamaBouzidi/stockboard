(function() {
  angular.module('stockboard.models.stockHistory', [])
  .factory('StockHistoryService', function($http, BASE_URL) {
    return {
      getStockHistory: function(stockSymbol) {
        return $http.jsonp('http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A1825%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22' + stockSymbol + '%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D&callback=JSON_CALLBACK');
      }
    }
  });
})();
