(function() {
  angular.module('stockboard.models.stockPrice', [])
  .factory('StockPriceService', function($http, BASE_URL) {
    return {
      getStockQuote: function (stockSymbol) {
        return $http.get('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + stockSymbol + '&callback=JSON_CALLBACK');
      }
    }
  });
})();
