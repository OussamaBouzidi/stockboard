(function() {
  angular.module('stockboard.controllers.dashboardProfile', [])
  .controller('DashboardProfileCtrl', function($scope) {
    console.log('This is the dashboard-profile');
    $scope.stocks = [
      { name: 'Apple', symbol: 'AAPL', price: ,shares: 101, status: , percent:  },
      { name: 'Google', symbol: 'GOOG', price: ,shares: 73, status: , percent:  },
      { name: 'Facebook', symbol: 'FB', price: ,shares: 245, status: , percent:  },
      { name: 'Bank of America', symbol: 'BAC', price: ,shares: 112, status: , percent:  },
      { name: 'SunEdison', symbol: 'SUNE', price: ,shares: 179, status: , percent:  },
      { name: 'Microsoft', symbol: 'MSFT', price: ,shares: 180, status: , percent:  }
    ];
  });
})();
