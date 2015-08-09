(function() {
  angular.module('stockboard.controllers.register', [])
  .controller('RegisterCtrl', function($scope, $state, FirebaseAuthService, UserService) {
    $scope.create = function(user) {
      console.log(user);
      // FirebaseAuthService.register(user)
      // .success(function(data) {
      //   UserService.addUser(user)
      //   .success(function(data) {
      //     console.log('added user to backend');
      //   })
      //   .catch(function(error) {
      //     console.error(error);
      //   })
      //   // save the user currently logged in to frontend
      //   // $state.go('dashboard.profile');
      // })
      // .catch(function(error) {
      //   console.error(error);
      // })
    }
  });
})();