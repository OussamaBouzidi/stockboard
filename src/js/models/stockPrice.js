(function() {
  angular.module('stockboard.models.stockPrice', [])
  .factory('StockPriceService', function($http) {
    return {
      getStockQuote: function (stockSymbol) {
        return $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + stockSymbol + '&callback=JSON_CALLBACK');
      }
    }
  });
})();
