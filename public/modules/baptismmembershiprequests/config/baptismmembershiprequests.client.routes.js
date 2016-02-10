'use strict';

//Setting up route
angular.module('baptismmembershiprequests').config(['$stateProvider',
	function($stateProvider) {
		// Baptismmembershiprequests state routing
		$stateProvider.
		state('listBaptismmembershiprequests', {
			url: '/baptismmembershiprequests',
			templateUrl: 'modules/baptismmembershiprequests/views/list-baptismmembershiprequests.client.view.html'
		}).
		state('createBaptismmembershiprequest', {
			url: '/baptismmembershiprequests/create',
			templateUrl: 'modules/baptismmembershiprequests/views/create-baptismmembershiprequest.client.view.html'
		}).
		state('viewBaptismmembershiprequest', {
			url: '/baptismmembershiprequests/:baptismmembershiprequestId',
			templateUrl: 'modules/baptismmembershiprequests/views/view-baptismmembershiprequest.client.view.html'
		}).
		state('editBaptismmembershiprequest', {
			url: '/baptismmembershiprequests/:baptismmembershiprequestId/edit',
			templateUrl: 'modules/baptismmembershiprequests/views/edit-baptismmembershiprequest.client.view.html'
		});
	}
]);