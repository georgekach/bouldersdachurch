'use strict';

//Setting up route
angular.module('ourbeliefs').config(['$stateProvider',
	function($stateProvider) {
		// Ourbeliefs state routing
		$stateProvider.
		state('listOurbeliefs', {
			url: '/ourbeliefs',
			templateUrl: 'modules/ourbeliefs/views/list-ourbeliefs.client.view.html'
		}).
		state('createOurbelief', {
			url: '/ourbeliefs/create',
			templateUrl: 'modules/ourbeliefs/views/create-ourbelief.client.view.html'
		}).
		state('viewOurbelief', {
			url: '/ourbeliefs/:ourbeliefId',
			templateUrl: 'modules/ourbeliefs/views/view-ourbelief.client.view.html'
		}).
		state('editOurbelief', {
			url: '/ourbeliefs/:ourbeliefId/edit',
			templateUrl: 'modules/ourbeliefs/views/edit-ourbelief.client.view.html'
		});
	}
]);