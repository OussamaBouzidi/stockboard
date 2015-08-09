(function() {
  'use strict';
  angular.module('stockboard.config.constants', [])
    .constant("BASE_URL", {
      base: "http:localhost:3000",
      firebase: "https://stockboard.firebaseio.com"
    })
})();
