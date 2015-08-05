(function() {
  angular.module('stockboard.controllers.dashboardProfile', [])
  .controller('DashboardProfileCtrl', function($scope, UserService, StockPriceService) {
    $scope.userData = UserService.currentUserData;
    UserService.getAllUserStockPurchases(UserService.getCurrentUser._id)
    .success(function(data) {
      $scope.stocks = data.filter(function(stock) {
        if (stock.user === $scope.userData.displayName) {
          return stock;
        }
      });
      // data.forEach(function(stock) {
      //   StockPriceService.getStockQuote()
      //   .success(function(data) {
      //     console.log(data);
      //   })
      //   .catch(function(error) {
      //     console.error(error);
      //   })      
      // })
    })
    .catch(function(error) {
      console.error(error);
    })
  });
})();
