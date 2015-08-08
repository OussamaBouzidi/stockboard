(function() {
  angular.module('stockboard.controllers.dashboardPortfolio', [])
  .controller('DashboardPortfolioCtrl', function($scope, UserService, StockPriceService) {
    var userData = UserService.currentUserData;
    UserService.getAllUserStockPurchases(userData._id)
    .success(function(data) {
      pieChartExpenditureData = [];
      pieChartPosProfitData = [];
      pieChartNegProfitData = [];
      barChartPercentData = [];
      barChartDollarsData = [];
      barChartProfitData = [];
      barChartExpenditureData = [];
      barChartStockSharesData = [];

      stocksData = data.filter(function(stock) {
        if (stock.user === userData.displayName) {
          return stock;
        }
      });
      
      $scope.totalExpenditure = stocksData.reduce(function(total, price) {
        return Number(total) + Number(price.shares * price.priceBought);
      }, 0).toFixed(2);

      var purchasedStocks = [],
          soldStocks = [],
          soldPositiveStocks = [],
          soldNegativeStocks = [];

      stocksData.forEach(function(stock) {
        if (stock.status === 'Purchased') {
          purchasedStocks.push(stock);
        } else {
          soldStocks.push(stock);
          if (stock.priceSold >= stock.priceBought) {
            soldPositiveStocks.push(stock);
          } else {
            soldNegativeStocks.push(stock);
          }
        }
      })

      purchasedStocks.forEach(function(stockData) {
        pieChartExpenditureData
        .push({
          name: stockData.name,
          y: (stockData.shares * stockData.priceBought)/$scope.totalExpenditure
        });
        barChartExpenditureData.push([stockData.name, stockData.shares * stockData.priceBought]);
        barChartStockSharesData.push([stockData.name, stockData.shares]);
      })

      soldStocks.forEach(function(stockData) {
        barChartProfitData.push([stockData.name, Number((stockData.sharesSold * (stockData.priceSold - stockData.priceBought)).toFixed(2))]);
      })
      
      soldPositiveStocks.forEach(function(stockData) {
        pieChartPosProfitData
        .push({
          name: stockData.name,
          y: stockData.sharesSold * (stockData.priceSold - stockData.priceBought)
        })
      })

      soldNegativeStocks.forEach(function(stockData) {
        pieChartNegProfitData
        .push({
          name: stockData.name,
          y: (stockData.sharesSold * (stockData.priceSold - stockData.priceBought))*-1
        })        
      })

      chartRenders.barChartSort(barChartProfitData, 'value', true);
      chartRenders.barChartSort(barChartExpenditureData, 'value', true);
      chartRenders.barChartSort(barChartStockSharesData, 'value', true);

      chartRenders.pieChartRender('#expenditure-pie', 'Expenditure Breakdown', "Cost", pieChartExpenditureData);
      chartRenders.pieChartRender('#profit-pie', 'Positive Profit Breakdown', "Cost", pieChartPosProfitData);
      chartRenders.pieChartRender('#neg-profit-pie', 'Negative Profit Breakdown', "Cost", pieChartNegProfitData);
      chartRenders.barChartRender('#profit-bar', 'Profit Returns',
                                  barChartProfitData.map(function(stock) { return stock[0]; }),
                                  'Dollars', UserService.currentUserData.displayName,
                                  barChartProfitData.map(function(stock) { return stock[1]; }));
      chartRenders.barChartRender('#total-cost-bar', 'Expenditure Costs',
                                  barChartExpenditureData.map(function(stock) { return stock[0]; }),
                                  'Dollars', UserService.currentUserData.displayName,
                                  barChartExpenditureData.map(function(stock) { return stock[1]; }));
      chartRenders.barChartRender('#total-shares-bar', 'Stock Shares Breakdown',
                                  barChartStockSharesData.map(function(stock) { return stock[0]; }),
                                  'Shares', UserService.currentUserData.displayName,
                                  barChartStockSharesData.map(function(stock) { return stock[1]; }));

      purchasedStocks.forEach(function(stock) {
        StockPriceService.getStockQuote(stock.symbol)
        .success(function(data) {
          barChartPercentData.push(
            [stock.symbol, Number((((data.LastPrice - stock.priceBought)/stock.priceBought) * 100).toFixed(4))]
          );
          barChartDollarsData.push(
            [stock.symbol, Number(((data.LastPrice * stock.shares) - (stock.priceBought * stock.shares)).toFixed(2))]
          );
          chartRenders.barChartSort(barChartPercentData, 'value', true);
          chartRenders.barChartSort(barChartDollarsData, 'value', true);
          chartRenders.barChartRender('#expenditure-bar-percent',
                                      'Current Potential Stock Returns (Percent)',
                                      barChartPercentData.map(function(stock) { return stock[0]; }),
                                      'Percentage',
                                      UserService.currentUserData.displayName,
                                      barChartPercentData.map(function(stock) { return stock[1]; }))
          chartRenders.barChartRender('#expenditure-bar-dollars',
                                      'Current Potential Stock Returns (Dollars)',
                                      barChartDollarsData.map(function(stock) { return stock[0]; }),
                                      'Dollars',
                                      UserService.currentUserData.displayName,
                                      barChartDollarsData.map(function(stock) { return stock[1]; }))
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
        if (type === 'value') {
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
      barChartRender: function(elementId, title, xAxisCategories, yAxisScale, seriesName, data) {
        $(elementId).highcharts({
          chart: {
            type: 'column'
          },
          title: {
            text: title
          },
          xAxis: {
            categories: xAxisCategories
          },
          yAxis: {
            title: {
              text: yAxisScale
            }
          },
          series: [{
            name: seriesName,
            data: data
          }]
        });        
      },
      pieChartRender: function(elementId, title, seriesName, seriesData) {
        $(elementId).highcharts({
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: title
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
            name: seriesName,
            colorByPoint: true,
            data: seriesData
          }]      
        })
      }
    }
  });
})();
