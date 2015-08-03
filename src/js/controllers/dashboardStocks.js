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
    stocksData.forEach(function(stock) {
      StockHistoryService.getStockHistory(stock.symbol)
      .success(function(data) {
        var dataPrices = data.Elements[0].DataSeries.close.values;
        var dataCoordinates = [];
        dataPrices.forEach(function(dataPoint, index) {
          dataCoordinates.push([data.Positions[index], dataPoint]);
        })
        $('#container1').highcharts('StockChart', {
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

    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
      $('#container2').highcharts('StockChart', {
        rangeSelector : {
          selected : 1
        },
        title : {
          text : 'AAPL'
        },
        series : [{
          name : 'AAPL',
          data : data,
          tooltip: {
            valueDecimals: 2
          }
        }]
      });
    });
    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
      $('#container3').highcharts('StockChart', {
        rangeSelector : {
          selected : 1
        },
        title : {
          text : 'AAPL'
        },
        series : [{
          name : 'AAPL',
          data : data,
          tooltip: {
            valueDecimals: 2
          }
        }]
      });
    });
  });
})();
