(function() {
  angular.module('stockboard.models.stockHistory', [])
  .factory('StockHistoryService', function($http, BASE_URL) {
    return {
      getStockHistory: function(stockSymbol) {
        return $http.jsonp('http://dev.markitondemand.com/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A1825%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22' + stockSymbol + '%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D');
      }
    }
    // Markit.InteractiveChartApi.prototype.render = function(data) {
    //   //console.log(data)
    //   // split the data set into ohlc and volume
    //   var ohlc = this._getOHLC(data),
    //       volume = this._getVolume(data);
    //   // set the allowed units for data grouping
    //   var groupingUnits = [[
    //     'week',                         // unit name
    //     [1]                             // allowed multiples
    //   ], [
    //     'month',
    //     [1, 2, 3, 4, 6]
    //   ]];
    //   // create the chart
    //   $('#chartDemoContainer').highcharts('StockChart', {
    //     rangeSelector: {
    //       selected: 1
    //       //enabled: false
    //     },
    //     title: {
    //       text: this.symbol + ' Historical Price'
    //     },
    //     yAxis: [{
    //       title: {
    //         text: 'OHLC'
    //       },
    //       height: 200,
    //       lineWidth: 2
    //     }, {
    //       title: {
    //         text: 'Volume'
    //       },
    //       top: 300,
    //       height: 100,
    //       offset: 0,
    //       lineWidth: 2
    //     }],
        
    //     series: [{
    //       type: 'candlestick',
    //       name: this.symbol,
    //       data: ohlc,
    //       dataGrouping: {
    //           units: groupingUnits
    //       }
    //     }, {
    //       type: 'column',
    //       name: 'Volume',
    //       data: volume,
    //       yAxis: 1,
    //       dataGrouping: {
    //           units: groupingUnits
    //       }
    //     }],
    //     credits: {
    //       enabled:false
    //     }
    //   });
    // };
  });
})();
