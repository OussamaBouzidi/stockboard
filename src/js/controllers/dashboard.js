(function() {
  angular.module('stockboard.controllers.dashboard', [])
  .controller('DashboardCtrl', function($scope) {
    console.log('This is the dashboard');
    $scope.stocks = [
    {name: 'AAPL', price: '53.49', change: '+0.30'},
    {name: 'AAPL', price: '13.43', change: '+0.39'},
    {name: 'AAPL', price: '33.23', change: '+0.34'},
    {name: 'AAPL', price: '45.95', change: '+0.32'},
    {name: 'AAPL', price: '8.40', change: '+0.12'},
    {name: 'AAPL', price: '24.62', change: '+0.35'}
    ];
  });
})();
