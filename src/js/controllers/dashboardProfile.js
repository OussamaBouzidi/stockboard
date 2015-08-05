(function() {
  angular.module('stockboard.controllers.dashboardProfile', [])
  .controller('DashboardProfileCtrl', function($scope, UserService, StockPriceService) {
    $scope.userData = UserService.currentUserData;
    UserService.getAllUserStockPurchases(UserService.getCurrentUser._id)
    .success(function(data) {
      //filter through stocks pulled for individuals stocks
      $scope.stocksPurchased = data.filter(function(stock) {
        if (stock.user === $scope.userData.displayName) {
          return stock;
        }
      });
      // calculate total expenditure and render to DOM
      $scope.totalExpenditure = $scope.stocks.reduce(function(total, price) {
        return Number(total) + Number(price.shares * price.priceBought);
      }, 0).toFixed(2);
    })
    .catch(function(error) {
      console.error(error);
    })
    $scope.deleteStockPurchase = function(stockId) {

      UserService.deleteStockPurchase($scope.userData._id, stockId)
      .success(function(data) {
        console.log('successfully deleted stock');
      })
      .catch(function(error) {
        console.log(error);
      })
    }
  });
})();
