(function() {
  'use strict';
  angular.module('stockboard.models', [
    'stockboard.models.user',
    'stockboard.models.graphs',
    'stockboard.models.fbAuth',
    'stockboard.models.stockHistory',
    'stockboard.models.stockPrice'
  ]);
})();
