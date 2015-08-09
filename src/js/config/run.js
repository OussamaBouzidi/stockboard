(function() {
  'use strict';
  angular.module('stockboard.config.run', [])
  .run(function($rootScope, BASE_URL, $firebaseAuth, FirebaseAuthService) {
    console.log(BASE_URL.firebase);
    FirebaseAuthService.ref = new Firebase(BASE_URL.firebase);
    FirebaseAuthService.afAuth = $firebaseAuth(FirebaseAuthService.ref);
  })
})();
