(function() {
  angular.module('stockboard.controllers.dashboardProfile', [])
  .controller('DashboardProfileCtrl', function($scope, $state, UserService, StockPriceService) {
    // On page state load
    // grab the user data and render to DOM 
    $scope.userData = UserService.currentUserData;
    // grab user stock information
    UserService.getAllUserStockPurchases(UserService.getCurrentUser._id)
    .success(function(data) {
      // filter through stocks pulled for individuals stocks and render to DOM
      $scope.stocksPurchased = data.filter(function(stock) {
        if (stock.user === $scope.userData.displayName) {
          return stock;
        }
      });
      // calculate total expenditure and render to DOM
      $scope.totalExpenditure = $scope.stocksPurchased.reduce(function(total, price) {
        return Number(total) + Number(price.shares * price.priceBought);
      }, 0).toFixed(2);
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
    // Edit stock purchase -- on click

    
  });
})();
