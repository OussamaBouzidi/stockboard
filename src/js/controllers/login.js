(function() {
  angular.module('stockboard.controllers.login', [])
  .controller('LoginCtrl', function($scope, $state, FirebaseAuthService) {
    console.log('This is the login page');
    $scope.signIn = function(user){
      // FirebaseAuthService.login(user)
      // .then(function(resp){
      //   $state.go('dashboard.profile');
      // })
      // .catch(function() {
      //   alert("Log in failed!");
      // })
    };
  });
})();
