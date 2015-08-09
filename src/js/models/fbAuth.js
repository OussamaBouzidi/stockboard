(function() {
  angular.module('stockboard.models.fbAuth', [])
  .factory('FirebaseAuthService', function() {
    var User = {};
    User.afAuth;
    User.ref;
    User.register = function(user){
      return User.afAuth.$createUser(user);
    };
    User.login = function(user){
      return this.afAuth.$authWithPassword(user);
    };
    User.logout = function(){
      return this.afAuth.$unauth();
    };
    return User;
    });
})();
