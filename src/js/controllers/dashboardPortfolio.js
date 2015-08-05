(function() {
  angular.module('stockboard.controllers.dashboardPortfolio', [])
  .controller('DashboardPortfolioCtrl', function($scope, UserService, StockPriceService) {
    var userData = UserService.currentUserData;
    UserService.getAllUserStockPurchases(userData._id)
    .success(function(data) {
      pieChartData = [];
      barChartData = [];

      stocksData = data.filter(function(stock) {
        if (stock.user === userData.displayName) {
          return stock;
        }
      });

      $scope.totalExpenditure = stocksData.reduce(function(total, price) {
        return Number(total) + Number(price.shares * price.priceBought);
      }, 0).toFixed(2);

      stocksData.forEach(function(stockData) {
        pieChartData.push({ 
                            name: stockData.name,
                            y: (stockData.shares * stockData.priceBought)/$scope.totalExpenditure
                          })
      })
      chartRenders.pieChartRender();

      stocksData.forEach(function(stock) {
        StockPriceService.getStockQuote(stock.symbol)
        .success(function(data) {
          barChartData.push(
            [stock.symbol, ((data.LastPrice - stock.priceBought)/stock.priceBought) * 100]
          );
          chartRenders.barChartSort(barChartData, 'percent', true);
          chartRenders.barChartRender();
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
      barChartRender: function() {
        $('#expenditure-bar').highcharts({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Stock Returns'
          },
          xAxis: {
            categories: barChartData.map(function(stock) {
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
            data: barChartData.map(function(stock) {
              return stock[1];
            })
          }]
        });
      },
      pieChartRender: function() {
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
      }
    }
  });
})();
