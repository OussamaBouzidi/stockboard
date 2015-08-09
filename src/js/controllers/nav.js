(function() {
  angular.module('stockboard.controllers.nav', [])
  .controller('NavCtrl', function($scope, $state, UserService, StockHistoryService, FirebaseAuthService) {
    console.log(UserService.loggedIn);
    UserService.getCurrentUser()
    .success(function(data) {
      console.log(data);
      UserService.currentUserData = data;
      if (data) {
        UserService.loggedIn = true;
      } else {
        $scope.loggedIn = false;
      }
      $scope.loggedIn = UserService.loggedIn;
    })
    .catch(function(error) {
      console.error(error);
      UserService.loggedIn = false;
    })
    $scope.logout = function() {
      // FirebaseAuthService.logout()
      // .succss(function(resp) {

      // })
      // .catch(function(error) {
      //   console.error(error);
      // })
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
