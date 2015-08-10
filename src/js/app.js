(function() {
  'use strict';
  angular.module('stockboard', [
    'ui.bootstrap',
    'ui.router',
    'firebase',
    'stockboard.config',
    'stockboard.controllers',
    'stockboard.models',
    'stockboard.directives'
  ]);
})();
