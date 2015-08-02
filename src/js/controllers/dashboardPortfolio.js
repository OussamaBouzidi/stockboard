(function() {
  angular.module('stockboard.controllers.dashboardPortfolio', [])
  .controller('DashboardPortfolioCtrl', function($scope, UserService, StockPriceService) {
    // UserService.getAllUserStockPurchases()
    // .success(function(data) {
    //   console.log(data);
    // })
    // .catch(function(error) {
    //   console.error(error);
    // })
    $scope.allStocks = [];
    var stocksData = [{name: 'Apple', symbol: 'AAPL', shares: 101, priceBought: 121.4},
                      {name: 'Google', symbol: 'GOOG', shares: 73, priceBought: 657.69},
                      {name: 'Facebook', symbol: 'FB', shares: 45, priceBought: 94},
                      {name: 'Bank of America', symbol: 'BAC', shares: 112, priceBought:17.9},
                      {name: 'SunEdison', symbol: 'SUNE', shares: 179, priceBought: 23.29},
                      {name: 'Microsoft', symbol: 'MSFT', shares: 80, priceBought: 46.71}];
    var stockSymbols = [];
    var pieChartData = [];
    var pieChartDataConverted = [];
    var totalExpenditure = stocksData.reduce(function(total, price) {
      return Number(total) + Number(price.shares * price.priceBought);
    }, 0).toFixed(2);
    stocksData.forEach(function(stockData) {
      stockSymbols.push(stockData.symbol);
      pieChartData.push({ 
                      name: stockData.name,
                      y: (stockData.shares * stockData.priceBought)/totalExpenditure
                    })
    })
    chartRender();
    // stockSymbols.forEach(function(symbol) {
    //   StockPriceService.getStockQuote(symbol)
    //   .success(function(data) {
    //     console.log(data, symbol);
    //     $scope.allStocks.push(data);
    //     chartRender();
    //   })
    //   .catch(function(error) {
    //     console.error(error);
    //   })
    // })

    function chartRender() {
      $('#expenditure-bar').highcharts({
        chart: {
          type: 'column'
        },
        title: {
          text: 'Stock Returns'
        },
        xAxis: {
          categories: stockSymbols
        },
        yAxis: {
          title: {
            text: 'Percentage'
          }
        },
        series: [{
          name: 'Stanley',
          data: [1.9, 0.5, -4.0, 3.2, -2.4, 4.1]
        }]
      });
      $('#expenditure-pie').highcharts({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Expenditure Breakdown'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [{
          name: "Brands",
          colorByPoint: true,
          data: pieChartData
        }]      
      })
    };
  });
})();
