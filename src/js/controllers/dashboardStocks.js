(function() {
  angular.module('stockboard.controllers.dashboardStocks', [])
  .controller('DashboardStocksCtrl', function($scope, UserService, StockHistoryService) {
    // UserService.getAllUserStockWatches()
    // .success(function(data) {
    //   console.log(data);
    // })
    // .catch(function(error) {
    //   console.error(error);
    // })
    var stocksData = [{name: 'Apple', symbol: 'AAPL', shares: 101, priceBought: 122.4},
                      {name: 'Google', symbol: 'GOOG', shares: 73, priceBought: 655.69},
                      {name: 'Facebook', symbol: 'FB', shares: 245, priceBought: 96},
                      {name: 'Bank of America', symbol: 'BAC', shares: 112, priceBought: 16.9},
                      {name: 'SunEdison', symbol: 'SUNE', shares: 179, priceBought: 22.29},
                      {name: 'Microsoft', symbol: 'MSFT', shares: 180, priceBought: 49.71}];
    var graphDivs = [];
    for (var i = 0; i < stocksData.length; i++) {
      graphDivs.push($('<div>').addClass('col-md-6').addClass('stock-line-graph').attr('id', 'graph' + i));
    }
    $('#graphs-container').append(graphDivs);
    stocksData.forEach(function(stock, graphIndex) {
      StockHistoryService.getStockHistory(stock.symbol)
      .success(function(data) {
        var dataPrices = data.Elements[0].DataSeries.close.values;
        var dataCoordinates = [];
        dataPrices.forEach(function(dataPoint, index) {
          var dateArray = data.Dates[index].split('-');
          var date = Date.UTC(Number(dateArray[0]), Number(dateArray[1])-1, Number(dateArray[2].slice(0,2)));
          dataCoordinates.push([date, dataPoint]);
        })
        $('#graph' + graphIndex).highcharts('StockChart', {
          rangeSelector : {
            selected : 1
          },
          title : {
            text : stock.name
          },
          series : [{
            name : stock.name,
            data : dataCoordinates,
            tooltip: {
              valueDecimals: 2
            }
          }]
        });
      })
      .catch(function(error) {
        console.error(error);
      })
    })
  });
})();
