'use strict';

/* Services */
beerApp.factory('beerRepository', ['$http', function($http) {
	return {
		getSetup: function(callback) {
			$http.get('beer/app.js').success(callback);
		}
	}
}]);