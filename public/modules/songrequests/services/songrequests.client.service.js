'use strict';

//Songrequests service used to communicate Songrequests REST endpoints
angular.module('songrequests').factory('Songrequests', ['$resource',
	function($resource) {
		return $resource('songrequests/:songrequestId', { songrequestId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);