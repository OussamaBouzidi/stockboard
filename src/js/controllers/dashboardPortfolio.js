(function() {
  angular.module('stockboard.controllers.dashboardPortfolio', [])
  .controller('DashboardPortfolioCtrl', function($scope, UserService, StockPriceService) {
    var userData = UserService.currentUserData;
    UserService.getAllUserStockPurchases(userData._id)
    .success(function(data) {
      pieChartExpenditureData = [];
      pieChartProfitData = [];
      barChartPercentData = [];
      barChartDollarsData = [];

      stocksData = data.filter(function(stock) {
        if (stock.user === userData.displayName) {
          return stock;
        }
      });
      
      $scope.totalExpenditure = stocksData.reduce(function(total, price) {
        return Number(total) + Number(price.shares * price.priceBought);
      }, 0).toFixed(2);

      var purchasedStocks = stocksData.filter(function(stock) {
        if (stock.status === 'Purchased') {
          return stock;
        }
      })
      var soldStocks = stocksData.filter(function(stock) {
        if (stock.status === "Sold") {
          return stock;
        }
      })

      purchasedStocks.forEach(function(stockData) {
        pieChartExpenditureData
        .push({
          name: stockData.name,
          y: (stockData.shares * stockData.priceBought)/$scope.totalExpenditure
        })
      })
      
      soldStocks.forEach(function(stockData) {
        pieChartProfitData
        .push({
          name: stockData.name,
          y: stockData.sharesSold * (stockData.priceSold - stockData.priceBought)
        })
      })

      chartRenders.pieChartExpenditureRender();
      chartRenders.pieChartProfitRender();

      purchasedStocks.forEach(function(stock) {
        StockPriceService.getStockQuote(stock.symbol)
        .success(function(data) {
          barChartPercentData.push(
            [stock.symbol, Number((((data.LastPrice - stock.priceBought)/stock.priceBought) * 100).toFixed(4))]
          );
          barChartDollarsData.push(
            [stock.symbol, Number(((data.LastPrice * stock.shares) - (stock.priceBought * stock.shares)).toFixed(2))]
          );
          chartRenders.barChartSort(barChartPercentData, 'percent', true);
          chartRenders.barChartSort(barChartDollarsData, 'percent', true);
          chartRenders.barChartPercentRender();
          chartRenders.barChartDollarsRender();
        })
        .catch(function(error) {
          console.error(error);
        })
      })
    })
    .catch(function(error) {
      console.error(error);
    })

    var chartRenders = {
      barChartSort: function(barChartData, type, ascending) {
        if (type === 'percent') {
          if (ascending) {
            return barChartData.sort(function(a, b) {
              return a[1] - b[1];
            });
          } else {
            return barChartData.sort(function(a, b) {
              return b[1] - a[1];
            });
          }
        } else {
          if (ascending) {
            return barChartData.sort(function(a, b) {
              return a[0] - b[0];
            });
          } else {
            return barChartData.sort(function(a, b) {
              return b[0] - a[0];
            });
          }
        }        
      },
      barChartPercentRender: function() {
        $('#expenditure-bar-percent').highcharts({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Current Potential Stock Returns (Percent)'
          },
          xAxis: {
            categories: barChartPercentData.map(function(stock) {
              return stock[0];
            })
          },
          yAxis: {
            title: {
              text: 'Percentage'
            }
          },
          series: [{
            name: UserService.currentUserData.displayName,
            data: barChartPercentData.map(function(stock) {
              return stock[1];
            })
          }]
        });
      },
      barChartDollarsRender: function() {
        $('#expenditure-bar-dollars').highcharts({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Current Potential Stock Returns (Dollars)'
          },
          xAxis: {
            categories: barChartDollarsData.map(function(stock) {
              return stock[0];
            })
          },
          yAxis: {
            title: {
              text: 'Dollars'
            }
          },
          series: [{
            name: UserService.currentUserData.displayName,
            data: barChartDollarsData.map(function(stock) {
              return stock[1];
            })
          }]
        });
      },
      pieChartExpenditureRender: function() {
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
            name: "Companies",
            colorByPoint: true,
            data: pieChartExpenditureData
          }]      
        })
      },
      pieChartProfitRender: function() {
        $('#profit-pie').highcharts({
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: 'Positive Profit Breakdown'
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
            name: "Companies",
            colorByPoint: true,
            data: pieChartProfitData
          }]      
        })
      }
    }
  });
})();
