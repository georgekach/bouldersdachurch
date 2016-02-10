'use strict';

//Setting up route
angular.module('ministries').config(['$stateProvider',
	function($stateProvider) {
		// Ministries state routing
		$stateProvider.
		state('listMinistries', {
			url: '/ministries',
			templateUrl: 'modules/ministries/views/list-ministries.client.view.html'
		}).
		state('createMinistry', {
			url: '/ministries/create',
			templateUrl: 'modules/ministries/views/create-ministry.client.view.html'
		}).
		state('viewMinistry', {
			url: '/ministries/:ministryId',
			templateUrl: 'modules/ministries/views/view-ministry.client.view.html'
		}).
		state('editMinistry', {
			url: '/ministries/:ministryId/edit',
			templateUrl: 'modules/ministries/views/edit-ministry.client.view.html'
		});
	}
]);