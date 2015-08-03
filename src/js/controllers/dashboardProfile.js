(function() {
  angular.module('stockboard.controllers.dashboardProfile', [])
  .controller('DashboardProfileCtrl', function($scope) {
    console.log('This is the dashboard-profile');
    $scope.stocks = [
      { name: 'Apple', symbol: 'AAPL', price: 122.4, shares: 101, status: 'Sold', percent: 1.2 },
      { name: 'Google', symbol: 'GOOG', price: 655.69, shares: 73, status: 'Hold', percent: 3 },
      { name: 'Facebook', symbol: 'FB', price: 96, shares: 245, status: 'Hold', percent: 2.12 },
      { name: 'Bank of America', symbol: 'BAC', price: 16.9, shares: 112, status: 'Hold', percent: -2.3 },
      { name: 'SunEdison', symbol: 'SUNE', price: 22.29, shares: 179, status: 'Hold', percent: -1.4 },
      { name: 'Microsoft', symbol: 'MSFT', price: 49.71, shares: 180, status: 'Sold', percent: 1.11 }
    ];
  });
})();
