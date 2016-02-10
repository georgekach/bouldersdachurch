'use strict';

//Information service used to communicate Information REST endpoints
angular.module('information').factory('Information', ['$resource',
	function($resource) {
		return $resource('information/:informationId', { informationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);