'use strict';

//Setting up route
angular.module('mediaresources').config(['$stateProvider',
	function($stateProvider) {
		// Mediaresources state routing
		$stateProvider.
		state('listMediaresources', {
			url: '/mediaresources',
			templateUrl: 'modules/mediaresources/views/list-mediaresources.client.view.html'
		}).
		state('createMediaresource', {
			url: '/mediaresources/create',
			templateUrl: 'modules/mediaresources/views/create-mediaresource.client.view.html'
		}).
		state('viewMediaresource', {
			url: '/mediaresources/:mediaresourceId',
			templateUrl: 'modules/mediaresources/views/view-mediaresource.client.view.html'
		}).
		state('editMediaresource', {
			url: '/mediaresources/:mediaresourceId/edit',
			templateUrl: 'modules/mediaresources/views/edit-mediaresource.client.view.html'
		});
	}
]);