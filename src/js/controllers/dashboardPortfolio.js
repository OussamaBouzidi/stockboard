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
    var stocksData = [{name: 'Apple', symbol: 'AAPL', shares: 101, priceBought: 122.4},
                      {name: 'Google', symbol: 'GOOG', shares: 73, priceBought: 655.69},
                      {name: 'Facebook', symbol: 'FB', shares: 245, priceBought: 96},
                      {name: 'Bank of America', symbol: 'BAC', shares: 112, priceBought:16.9},
                      {name: 'SunEdison', symbol: 'SUNE', shares: 179, priceBought: 29.29},
                      {name: 'Microsoft', symbol: 'MSFT', shares: 180, priceBought: 49.71}];
    var stockSymbols = [];
    var pieChartData = [];
    var barChartData = [];
    $scope.totalExpenditure = stocksData.reduce(function(total, price) {
      return Number(total) + Number(price.shares * price.priceBought);
    }, 0).toFixed(2);
    stocksData.forEach(function(stockData) {
      stockSymbols.push(stockData.symbol);
      pieChartData.push({ 
                        name: stockData.name,
                        y: (stockData.shares * stockData.priceBought)/$scope.totalExpenditure
                      })
    })
    stocksData.forEach(function(stock) {
      StockPriceService.getStockQuote(stock.symbol)
      .success(function(data) {
        console.log(data.LastPrice, stock.symbol);
        barChartData.push(
          ((data.LastPrice - stock.priceBought)/stock.priceBought) * 100
        );
        chartRender();
      })
      .catch(function(error) {
        console.error(error);
      })
    })
    // stockSymbols.forEach(function(symbol) {
    //   StockPriceService.getStockQuote(symbol)
    //   .success(function(data) {
    //     console.log(data, symbol);
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
          data: barChartData
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
