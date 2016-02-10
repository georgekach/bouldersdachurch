'use strict';

//Mediaresources service used to communicate Mediaresources REST endpoints
angular.module('mediaresources').factory('Mediaresources', ['$resource',
	function($resource) {
		return $resource('mediaresources/:mediaresourceId', { mediaresourceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);