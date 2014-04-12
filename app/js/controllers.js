'use strict';

/* Controllers */

var beerApp = angular.module('beerApp', []);

beerApp.controller('beerTestCtrl', function($scope, $http) {
  $http.get('beer/app.js').success(function(data) {
    $scope.appData = data;
  });

  $scope.toggleEquipment = function(equipmentType, equipment) {
  	switch(equipmentType) {
  		case "valve":
  			if(!equipment.manual) {
  				//toggle 3 way -> inactive, active(left), active(right)
  				if(equipment.type==3) {
  					if(!equipment.active) {
  						equipment.active = true;
  						equipment.direction = "left";
  					} else {
  						if(equipment.direction=="left") {
  							equipment.direction = "right";
  						} else {
  							equipment.active = false;
  						}
  					}
  				} else {
  					equipment.active = !equipment.active;	
  				}
	  		}
  			break;
  		case "pump":
  		case "heater":
  			equipment.active = !equipment.active;
 			break;
  	}
  }

  $scope.equipmentImg = function(equipmentType, equipment) {
  	switch(equipmentType) {
  		case "valve":
  			if(!equipment.manual) {
	  			if(equipment.active) {
  					return equipment.img[(equipment.type==3) ? equipment.direction : "open"];
	  			}
	  			return equipment.img.default;
	  		}
  			break;
  		case "pump":
  		case "heater":
  			return equipment.img[equipment.active ? "on":"default"];
  	}
  	return equipment.img;
  }
});