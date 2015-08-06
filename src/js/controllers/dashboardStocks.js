(function() {
  angular.module('stockboard.controllers.dashboardStocks', [])
  .controller('DashboardStocksCtrl', function($scope, UserService, StockHistoryService) {
    graphDivs = [];
    var userData = UserService.currentUserData;
    UserService.getAllUserStockWatches(userData._id)
    .success(function(data) {
      // grab all watches 
      stocksData = data.filter(function(stock) {
        if (stock.user === userData.displayName) {
          return stock;
        }
      });

      for (var i = 0; i < stocksData.length; i++) {
        graphDivs.push($('<div>').addClass('col-md-6 stock-line-graph').attr('id', 'graph' + i));
      }
      $('#graphs-container').append(graphDivs);
      stocksData.forEach(function(stock, graphIndex) {
        StockHistoryService.getStockHistory(stock.symbol)
        .success(function(data) {
          dataPrices = data.Elements[0].DataSeries.close.values;
          dataCoordinates = [];
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
    })
    .catch(function(error) {
      console.error(error);
    })
  });
})();
