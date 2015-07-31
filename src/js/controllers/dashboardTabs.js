(function() {
  angular.module('stockboard.controllers.dashboardTabs', [])
  .controller('DashboardTabsCtrl', function($scope) {
    console.log('This is the dashboard tabs');
    $scope.tabs = [
      { title:'Dynamic Title 1', content:'Dynamic content 1' },
      { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];
  });
})();
