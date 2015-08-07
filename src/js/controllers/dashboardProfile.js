(function() {
  angular.module('stockboard.controllers.dashboardProfile', [])
  .controller('DashboardProfileCtrl', function($scope, $state, UserService, StockPriceService) {
    // filter function after retreiving data
    var stockFilter = function(data) {
      data.filter(function(stock) {
        if (stock.user === $scope.userData.displayName) {
          return stock;
        }
      })
    }
    var purchaseSoldFilter = function(stock, status) {
      if (stock.status === status) {
        return stock;
      }
    }
    // On page state load
    $scope.isCollapsed = true;
    // grab the user data and render to DOM 
    $scope.userData = UserService.currentUserData;
    UserService.getAllUserStockWatches($scope.userData._id)
    .success(function(data) {
      $scope.watchedStocks = data.filter(function(stock) {
        if (stock.user === $scope.userData.displayName) {
          return stock;
        }
      });
    })
    .catch(function(error) {
      console.error(error);
    })
    // grab user stock information
    UserService.getAllUserStockPurchases($scope.userData._id)
    .success(function(data) {
      // filter through stocks pulled for individuals stocks and render to DOM
      $scope.stocks = data.filter(function(stock) {
        if (stock.user === $scope.userData.displayName) {
          return stock;
        }
      });
      console.log($scope.stocks);
      $scope.stocksPurchased = $scope.stocks.filter(function(stock) {
        if (stock.status === 'Purchased') {
          return stock;
        }
      })
      console.log($scope.stocksPurchased);
      $scope.stocksSold = $scope.stocks.filter(function(stock) {
        if (stock.status === 'Sold') {
          return stock;
        }
      })
      // calculate total expenditure and render to DOM
      // $scope.totalExpenditure = $scope.stocksPurchased.reduce(function(total, price) {
      //   return Number(total) + Number(price.shares * price.priceBought);
      // }, 0).toFixed(2);
    })
    .catch(function(error) {
      console.error(error);
    })

    // Event-listener functions
    // Delete stock purchase -- on click
    $scope.deleteStockPurchase = function(stockId) {
      UserService.deleteStockPurchase(stockId)
      .success(function(data) {
        console.log('successfully deleted stock');
        $state.reload();
      })
      .catch(function(error) {
        console.log(error);
      })
    }
    // Delete stock watch -- on click
    $scope.deleteWatchedStock = function(stockId) {
      UserService.deleteStockWatch(stockId)
      .success(function(data) {
        console.log('successfully deleted stock watch!');
        $state.reload();
      })
      .catch(function(error) {
        console.error(error);
      })
    }
    // Edit stock purchase -- on click
    $scope.editStock = function(stockId) {

    }
    // Sell stock, send info to modal
    $scope.renderSellInfo = function(stock) {
      $scope.sellStock = stock;
    }
    // Sell stock, update info in backend and rerender
    $scope.submitSell = function(sellForm) {
      var newSoldStock = $scope.sellStock;
      if (newSoldStock.shares - sellForm.shares < 0) {
        alert("You can't sell that many shares")
        return;
      } else {
        newSoldStock.shares = newSoldStock.shares - sellForm.shares;
      }
      newSoldStock.status = "Sold";
      newSoldStock.sharesSold = sellForm.shares;
      newSoldStock.priceSold = sellForm.price;
      console.log(newSoldStock);
      UserService.sellStockPurchase(newSoldStock._id, newSoldStock)
      .success(function(data) {
        console.log(data, 'successfully sold stock!');
      })
      .catch(function(error) {
        console.error(error)
      })
    }
    // Render stock info to info block
    $scope.infoRender = function(stock) {
      StockHistoryService.getStockHistory(stock.symbol)
      .success(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        console.error(error);
      })
      StockPriceService.getSockQuote(stock.symbol)
      .success(function(data) {
        console.log(data)
        
      })
      .catch(function(error) {
        console.error(error);
      })
    }
  });
})();
