'use strict';

//Ourbeliefs service used to communicate Ourbeliefs REST endpoints
angular.module('ourbeliefs').factory('Ourbeliefs', ['$resource',
	function($resource) {
		return $resource('ourbeliefs/:ourbeliefId', { ourbeliefId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);