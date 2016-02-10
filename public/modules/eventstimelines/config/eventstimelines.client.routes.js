'use strict';

//Setting up route
angular.module('eventstimelines').config(['$stateProvider',
	function($stateProvider) {
		// Eventstimelines state routing
		$stateProvider.
		state('listEventstimelines', {
			url: '/eventstimelines',
			templateUrl: 'modules/eventstimelines/views/list-eventstimelines.client.view.html'
		}).
		state('createEventstimeline', {
			url: '/eventstimelines/create',
			templateUrl: 'modules/eventstimelines/views/create-eventstimeline.client.view.html'
		}).
		state('viewEventstimeline', {
			url: '/eventstimelines/:eventstimelineId',
			templateUrl: 'modules/eventstimelines/views/view-eventstimeline.client.view.html'
		}).
		state('editEventstimeline', {
			url: '/eventstimelines/:eventstimelineId/edit',
			templateUrl: 'modules/eventstimelines/views/edit-eventstimeline.client.view.html'
		});
	}
]);