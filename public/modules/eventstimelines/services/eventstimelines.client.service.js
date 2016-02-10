'use strict';

//Eventstimelines service used to communicate Eventstimelines REST endpoints
angular.module('eventstimelines').factory('Eventstimelines', ['$resource',
	function($resource) {
		return $resource('eventstimelines/:eventstimelineId', { eventstimelineId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);