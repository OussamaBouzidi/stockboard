(function() {
  'use strict';

  angular.module('stockboard', [
    'ui.router',
    'stockboard.config',
    'stockboard.controllers',
    'stockboard.models',
    'stockboard.directives'
  ]);
})();
