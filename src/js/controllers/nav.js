(function() {
  angular.module('stockboard.controllers.nav', [])
  .controller('NavCtrl', function($scope, $state, UserService, StockHistoryService) {
    $scope.loggedIn = UserService.loggedIn;
    UserService.getCurrentUser()
    .success(function(data) {
      UserService.currentUserData = data;
      UserService.loggedIn = true;
      $scope.loggedIn = UserService.loggedIn;
    })
    .catch(function(error) {
      console.error(error);
      UserService.loggedIn = false;
    })
    $scope.logout = function() {
      FirebaseAuthService.logout()
      .success(function(resp) {

      })
      .catch(function(error) {
        console.error(error);
      })
      UserService.logoutCurrentUser()
      .success(function(data) {
        console.log('successfully logged out');
        $scope.loggedIn = UserService.loggedIn;
        $state.go('home');
      })
      .catch(function(error) {
        console.log('failed logging out');
      })
    }
  });
})();
