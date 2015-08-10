(function() {
  angular.module('stockboard.controllers.dashboardProfile', [])
  .controller('DashboardProfileCtrl', function($scope, $state, UserService, StockPriceService, StockHistoryService) {
    // On page state load
    $scope.isCollapsed = true;
    // grab the user data and render to DOM 
    $scope.userData = UserService.currentUserData;
    function renderWatches() {
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
    }
    renderWatches();
    // grab user stock information
    UserService.getAllUserStockPurchases($scope.userData._id)
    .success(function(data) {
      // filter through stocks pulled for individuals stocks and render to DOM
      $scope.stocks = data.filter(function(stock) {
        if (stock.user === $scope.userData.displayName) {
          return stock;
        }
      });
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
      swal({   
        title: "Are you sure?",   
        text: "You will not be able to recover this purchase!",   
        type: "warning",   
        showCancelButton: true,   
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: "Yes, delete it!",   
        closeOnConfirm: false 
      }, function(){
        UserService.deleteStockPurchase(stockId)
        .success(function(data) {
          swal('', 'Sucessfully deleted stock purchase!', 'success');
          $state.reload();
        })
        .catch(function(error) {
          swal('', 'Failed to delete stock purchase!', 'error');
          console.log(error);
        })
      });
    }
    // Delete stock watch -- on click
    $scope.deleteWatchedStock = function(stockId) {
      swal({   
        title: "Are you sure?",   
        text: "You will not be able to recover this purchase!",   
        type: "warning",   
        showCancelButton: true,   
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: "Yes, delete it!",   
        closeOnConfirm: false 
      }, function(){
        UserService.deleteStockWatch(stockId)
        .success(function(data) {
          swal('', 'Sucessfully deleted watched stock!', 'success');
          renderWatches();
        })
        .catch(function(error) {
          console.error(error);
          swal('', 'Failed to delete watched stock!', 'error');
        })
        $('#watchModal').modal('hide');
      });

    }
    $scope.renderEditInfo = function(stock) {
      console.log(stock);
      $scope.edit = stock;
    }
    // Edit stock purchase -- on click
    $scope.editStock = function(stock) {
      console.log(stock);
      var edittedStock = $scope.edit;
      edittedStock.name = stock.name;
      edittedStock.symbol = stock.symbol;
      edittedStock.priceBought = stock.priceBought;
      edittedStock.shares = stock.shares;
      edittedStock.sharesSold = stock.sharesSold;
      edittedStock.priceSold = stock.priceSold;
      UserService.editPurchase($scope.edit._id, edittedStock)
      .success(function(data) {
        console.log(data, 'successfully updated stock purchase!');
      })
      .catch(function(error) {
        console.error(error);
      })
      $('#editPurchasedModal').modal('hide');
      $('#editSoldModal').modal('hide');
    }
    // Sell stock, send info to modal
    $scope.renderSellInfo = function(stock) {
      $scope.sellStock = stock;
    }
    // Sell stock, update info in backend and rerender
    $scope.submitSell = function(sellForm) {
      var newSoldStock = $scope.sellStock;
      var oldSoldStock = $scope.sellStock;
      if (newSoldStock.shares - sellForm.shares < 0) {
        alert("You can't sell that many shares!")
        return;
      } else if (newSoldStock.shares - sellForm.shares === 0) {
        newSoldStock.status = "Sold";
        newSoldStock.sharesSold = sellForm.shares;
        newSoldStock.priceSold = sellForm.price;
        UserService.sellStockPurchase(newSoldStock._id, newSoldStock)
        .success(function(data) {
          console.log(data, 'successfully sold stock!');
        })
        .catch(function(error) {
          console.error(error)
        })
      } else {
        newSoldStock.shares = newSoldStock.shares - sellForm.shares;
        if (newSoldStock.shares !== sellForm.shares) {
          delete oldSoldStock["_id"];
          delete oldSoldStock["__v"];
          oldSoldStock.status = 'Purchased';
          oldSoldStock.shares = newSoldStock.shares - sellForm.shares;
          oldSoldStock.sharesSold = sellForm.shares;
          oldSoldStock.priceSold = sellForm.price;
          UserService.addStockPurchase(oldSoldStock)
          .success(function(data) {
            console.log('success duplicate', data);
          })
          .catch(function(error) {
            console.error(error);
          })
        }
      }
      newSoldStock.status = "Sold";
      newSoldStock.sharesSold = sellForm.shares;
      newSoldStock.priceSold = sellForm.price;
      UserService.sellStockPurchase(newSoldStock._id, newSoldStock)
      .success(function(data) {
        console.log(data, 'successfully sold stock!');
        $state.reload();
      })
      .catch(function(error) {
        console.error(error)
      })
      $('#sellModal').modal('hide');
    }
    // Render stock info to info block
    $scope.showInfo = function(stock) {
      StockHistoryService.getStockHistory(stock.symbol)
      .success(function(data) {
        dataCoordinates = [];
        dataPrices = data.Elements[0].DataSeries.close.values;
        dataPrices.forEach(function(dataPoint, index) {
          var dateArray = data.Dates[index].split('-');
          var date = Date.UTC(Number(dateArray[0]), Number(dateArray[1])-1, Number(dateArray[2].slice(0,2)));
          dataCoordinates.push([date, dataPoint]);
        })
        $('#infoRenderGraph').highcharts('StockChart', {
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
      StockPriceService.getStockQuote(stock.symbol)
      .success(function(data) {
        console.log(data);
        $scope.stockInfoRender = data;
      })
      .catch(function(error) {
        console.error(error);
      })
    }
  });
})();
