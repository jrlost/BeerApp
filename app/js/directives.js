'use strict';

/* Directives */
beerApp.directive("drawing", ['$timeout', function($timeout){
	return {
		restrict: "A",
		scope: {
			items: '=',
		},
		controller: 'beerTestCtrl',
		link: function(scope, element, attrs){
			var buildCanvas = function () { 
				var ctx = element[0].getContext('2d');
				var currentKettleCount = 0;

				//Draw kettles
				angular.forEach(scope.items.vessels, function(vessel, index){
					//console.log(vessel);
					var imageObj = new Image();
					imageObj.onload = function() {
						ctx.drawImage(imageObj, vessel.position.left, vessel.position.top);
						currentKettleCount++;

						if(currentKettleCount==scope.items.vessels.length) {
							//Draw plumbing
							buildPlumbing(ctx);

							//Draw liquid levels
							buildVesselLiquidLevels(ctx);
						}
					};
					imageObj.src = vessel.img;
				});

				//Draw coolers
				angular.forEach(scope.items.coolers, function(cooler, index){
					//console.log(cooler);
					var imageObj = new Image();
					imageObj.onload = function() {
						ctx.drawImage(imageObj, cooler.position.left, cooler.position.top);
					};
					imageObj.src = cooler.img;
				});

				//Draw manual valves
				angular.forEach(scope.items.valves, function(valve, index){
					if(valve.manual) {
						//console.log(valve);
						var imageObj = new Image();
						imageObj.onload = function() {
							ctx.drawImage(imageObj, valve.position.left, valve.position.top);
						};
						imageObj.src = valve.img;
					}
				});

				//Draw auto valves
				//Draw auto pumps
				//Draw heaters
			}

			var buildPlumbing = function(ctx) {
				ctx.lineWidth = 6;

				//Draw plumbing
				angular.forEach(scope.items.plumbing, function(plumbing, index){
					//console.log(plumbing);
					ctx.beginPath();
					ctx.strokeStyle = plumbing.active || activeTube(plumbing.id) ? "#007F0E" : "#AAA";
					angular.forEach(plumbing.points, function(point, index){
						if(index==0) {
							ctx.moveTo(point.x,point.y);
						} else {
							ctx.lineTo(point.x,point.y);
							ctx.stroke();
						}
					});
				});
			}

			var buildVesselLiquidLevels = function(ctx) {
				ctx.closePath();
				ctx.beginPath();
				ctx.lineWidth = 3;
				ctx.strokeStyle = "#22E";
				
				angular.forEach(scope.items.vessels, function(vessel, index){
					if(vessel.volume.liquidLevel) {
						var currentVolume = vessel.volume.currentVolume < vessel.volume.maxVolume ? vessel.volume.currentVolume : vessel.volume.maxVolume;
						var totalVesselHeight = (vessel.volume.liquidLevel.min[0].y - vessel.volume.liquidLevel.max[0].y);
						var newy = vessel.volume.liquidLevel.min[0].y - (totalVesselHeight * (currentVolume/vessel.volume.maxVolume));

						//Draw line
						ctx.moveTo(vessel.volume.liquidLevel.min[0].x, newy);
						ctx.lineTo(vessel.volume.liquidLevel.min[1].x, newy);
						ctx.stroke();
					}
				});

				//console.log(element[0].toDataURL());
			}

			//$timeout(buildCanvas, 200);
			scope.$watch('items', function(newVal, oldVal) {
				if (!newVal && !oldVal) {
					return;
				}
				if (newVal!=oldVal) {
					reset();
				}
			}, true);

			// canvas reset
			function reset(){
				element[0].width = element[0].width;
				element[0].width = window.innerWidth;
                element[0].height = window.innerHeight-200;
				buildCanvas();
			}

			function activeTube(id) {
				var active = false;
				for (var i=0 ; i<=scope.items.valves.length - 1; i++) {
					var valve = scope.items.valves[i];

					if(valve.active) {
						if(valve.type==2) {
							active = (valve.plumbing.open.indexOf(id) > -1);
						} else {
							active = (valve.plumbing[valve.direction].indexOf(id) > -1);
						}

						if(active && valve.plumbing.dependencies && valve.plumbing.dependencies[valve.direction]) {
							var vs = null;
							angular.forEach(valve.plumbing.dependencies[valve.direction], function(value) {
								vs = getEquipmentId(scope.items.valves, value.id);
								active &= vs.active && vs.direction==value.direction;
							});
						}

						if(active) {
							break;
						}
					}
				}
				return active;
			}

			function getEquipmentId(equipment, id) {
				for (var i=0 ; i<=equipment.length - 1; i++) {
					if(equipment[i].id==id) {
						return equipment[i];
					}
				}
			}
		}
	};
}]).directive('ngEsc', function() {
  return function(scope, elm, attr) {
    elm.bind('keydown', function(e) {
      if (e.keyCode === 27) {
        scope.$apply(attr.ngEsc);
      }
    });
  };
}).directive('ngEnter', function() {
  return function(scope, elm, attr) {
    elm.bind('keypress', function(e) {
      if (e.keyCode === 13) {
        scope.$apply(attr.ngEnter);
      }
    });
  };
}).directive('ngAdjustup', function() {
  return function(scope, elm, attr) {
    elm.bind('keydown', function(e) {
      if (e.keyCode === 38) {
        scope.$apply(attr.ngAdjustup);
      }
    });
  };
}).directive('ngAdjustdown', function() {
  return function(scope, elm, attr) {
    elm.bind('keydown', function(e) {
      if (e.keyCode === 40) {
        scope.$apply(attr.ngAdjustdown);
      }
    });
  };
}).directive('ngInlineTemp', function($timeout) {
  return {
    scope: {
      model: '=ngInlineTemp'
    },
    link: function(scope, elm, attr) {
      var previousValue;
      scope.edit = function() {
        scope.editing = true;
        previousValue = scope.model;
        $timeout(function() {elm.find('input')[0].focus();}, 0, false);
      };
      scope.save = function() {
        scope.editing = false;
        scope.model = scope.model.toString().replace(/[^0-9.]/g,'');
        if(scope.model > 210) {
        	scope.model = "210.0";
        }
      };
      scope.update = function(value) {
      	scope.model = scope.model.toString().replace(/[^0-9.]/g,'');
      	scope.model = ((1.0 * scope.model) + (1.0 * value)).toFixed(1);
      	if(scope.model < 0) {
      		scope.model = "0.0";
      	}
      	if(scope.model > 210) {
      		scope.model = "210.0";
      	}
      };
      scope.cancel = function() {
        scope.editing = false;
        scope.model = previousValue;
      };
    },
    templateUrl: 'partials/inlineTempEdit.html'
  };
});