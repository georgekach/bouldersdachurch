'use strict';

//Baptismmembershiprequests service used to communicate Baptismmembershiprequests REST endpoints
angular.module('baptismmembershiprequests').factory('Baptismmembershiprequests', ['$resource',
	function($resource) {
		return $resource('baptismmembershiprequests/:baptismmembershiprequestId', { baptismmembershiprequestId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);