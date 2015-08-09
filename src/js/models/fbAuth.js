(function() {
  angular.module('stockboard.models.fbAuth', [])
  .factory('FirebaseAuthService', function() {
    var Firebase = {};
    Firebase.afAuth;
    Firebase.ref;
    Firebase.register = function(user){
      return this.afAuth.$createUser(user);
    };
    Firebase.login = function(user){
      return this.afAuth.$authWithPassword(user);
    };
    Firebase.logout = function(){
      return this.afAuth.$unauth();
    };
    return Firebase;
  });
})();
