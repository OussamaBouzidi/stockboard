(function() {
  angular.module('stockboard.controllers.dashboardPortfolio', [])
  .controller('DashboardPortfolioCtrl', function($scope, UserService, StockPriceService, GraphService) {
    var userData = UserService.currentUserData;
    $scope.isCollapsed = true;
    $scope.stockPurchaseGraphs = [
      { name: 'Expenditure Breakdown', id: 'expenditure-pie' },
      { name: 'Expenditure Costs', id: 'total-cost-bar' },
      { name: 'Stock Shares Purchased', id: 'total-shares-bar' },
      { name: 'Current Potential Stock Returns (Percent)', id: 'expenditure-bar-percent' },
      { name: 'Current Potential Stock Returns (Dollars)', id: 'expenditure-bar-dollars' }
    ];
    $scope.stockSoldGraphs = [
      { name: 'Profit Breakdown', id: 'profit-pie' },
      { name: 'Losses Breakdown', id: 'neg-profit-pie'},
      { name: 'Profit Returns', id: 'profit-bar'}
    ]
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

      GraphService.barChartSort(barChartProfitData, 'value', true);
      GraphService.barChartSort(barChartExpenditureData, 'value', true);
      GraphService.barChartSort(barChartStockSharesData, 'value', true);

      GraphService.pieChartRender('#expenditure-pie', 'Expenditure Breakdown', "Cost", pieChartExpenditureData);
      GraphService.pieChartRender('#profit-pie', 'Profit Breakdown', "Cost", pieChartPosProfitData);
      GraphService.pieChartRender('#neg-profit-pie', 'Losses Breakdown', "Cost", pieChartNegProfitData);
      GraphService.barChartRender('#profit-bar', 'Profit Returns',
                                  barChartProfitData.map(function(stock) { return stock[0]; }),
                                  'Dollars', UserService.currentUserData.displayName,
                                  barChartProfitData.map(function(stock) { return stock[1]; }));
      GraphService.barChartRender('#total-cost-bar', 'Expenditure Costs',
                                  barChartExpenditureData.map(function(stock) { return stock[0]; }),
                                  'Dollars', UserService.currentUserData.displayName,
                                  barChartExpenditureData.map(function(stock) { return stock[1]; }));
      GraphService.barChartRender('#total-shares-bar', 'Stock Shares Purchased',
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
          GraphService.barChartSort(barChartPercentData, 'value', true);
          GraphService.barChartSort(barChartDollarsData, 'value', true);
          GraphService.barChartRender('#expenditure-bar-percent',
                                      'Current Potential Stock Returns (Percent)',
                                      barChartPercentData.map(function(stock) { return stock[0]; }),
                                      'Percentage',
                                      UserService.currentUserData.displayName,
                                      barChartPercentData.map(function(stock) { return stock[1]; }))
          GraphService.barChartRender('#expenditure-bar-dollars',
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
  });
})();
