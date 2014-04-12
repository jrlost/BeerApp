'use strict';

/* Controllers */

var beerApp = angular.module('beerApp', []);

beerApp.controller('beerTestCtrl', function($scope, $http) {
  $http.get('beer/app.js').success(function(data) {
    $scope.appData = data;
  });
});