'use strict';

//Setting up route
angular.module('songrequests').config(['$stateProvider',
	function($stateProvider) {
		// Songrequests state routing
		$stateProvider.
		state('listSongrequests', {
			url: '/songrequests',
			templateUrl: 'modules/songrequests/views/list-songrequests.client.view.html'
		}).
		state('createSongrequest', {
			url: '/songrequests/create',
			templateUrl: 'modules/songrequests/views/create-songrequest.client.view.html'
		}).
		state('viewSongrequest', {
			url: '/songrequests/:songrequestId',
			templateUrl: 'modules/songrequests/views/view-songrequest.client.view.html'
		}).
		state('editSongrequest', {
			url: '/songrequests/:songrequestId/edit',
			templateUrl: 'modules/songrequests/views/edit-songrequest.client.view.html'
		});
	}
]);