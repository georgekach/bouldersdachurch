'use strict';

//Ministries service used to communicate Ministries REST endpoints
angular.module('ministries').factory('Ministries', ['$resource',
	function($resource) {
		return $resource('ministries/:ministryId', { ministryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);