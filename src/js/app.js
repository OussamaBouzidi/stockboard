(function() {
  'use strict';

  angular.module('stockboard', [
    'ui.bootstrap',
    'ui.router',
    'stockboard.config',
    'stockboard.controllers',
    'stockboard.models',
    'stockboard.directives'
  ]);
})();
