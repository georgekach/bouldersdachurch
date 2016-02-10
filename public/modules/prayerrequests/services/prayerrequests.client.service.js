'use strict';

//Prayerrequests service used to communicate Prayerrequests REST endpoints
angular.module('prayerrequests').factory('Prayerrequests', ['$resource',
	function($resource) {
		return $resource('prayerrequests/:prayerrequestId', { prayerrequestId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);