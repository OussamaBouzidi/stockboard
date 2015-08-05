(function() {
  angular.module('stockboard.controllers.dashboardProfile', [])
  .controller('DashboardProfileCtrl', function($scope, UserService) {
    UserService.getCurrentUser()
    .success(function(data) {
      UserService.currentUserData = data;
      $scope.userData = UserService.currentUserData;
    })
    .catch(function(error) {
      console.error(error);
    })
    UserService.getAllUserStockPurchases(UserService.getCurrentUser._id)
    .success(function(data) {
      data.forEach(function(stock) {
        StockPriceService.getStockQuote()
        .success(function(data) {
          $scope.stocks.push(data);
        })
        .catch(function(error) {
          console.error(error);
        })      
      })
    })
    .catch(function(error) {
      console.error(error);
    })
    // $scope.stocks = [
    //   { name: 'Apple', symbol: 'AAPL', priceBought: 122.4, shares: 101, status: 'Sold', percent: 1.2 },
    //   { name: 'Google', symbol: 'GOOG', priceBought: 655.69, shares: 73, status: 'Hold', percent: 3 },
    //   { name: 'Facebook', symbol: 'FB', priceBought: 96, shares: 245, status: 'Hold', percent: 2.12 },
    //   { name: 'Bank of America', symbol: 'BAC', priceBought: 16.9, shares: 112, status: 'Hold', percent: -2.3 },
    //   { name: 'SunEdison', symbol: 'SUNE', priceBought: 22.29, shares: 179, status: 'Hold', percent: -1.4 },
    //   { name: 'Microsoft', symbol: 'MSFT', priceBought: 49.71, shares: 180, status: 'Sold', percent: 1.11 }
    // ];
  });
})();
