'use strict';

//Setting up route
angular.module('information').config(['$stateProvider',
	function($stateProvider) {
		// Information state routing
		$stateProvider.
		state('listInformation', {
			url: '/information',
			templateUrl: 'modules/information/views/list-information.client.view.html'
		}).
		state('createInformation', {
			url: '/information/create',
			templateUrl: 'modules/information/views/create-information.client.view.html'
		}).
		state('viewInformation', {
			url: '/information/:informationId',
			templateUrl: 'modules/information/views/view-information.client.view.html'
		}).
		state('editInformation', {
			url: '/information/:informationId/edit',
			templateUrl: 'modules/information/views/edit-information.client.view.html'
		});
	}
]);