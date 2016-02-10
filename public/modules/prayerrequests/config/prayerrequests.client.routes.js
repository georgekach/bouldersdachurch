'use strict';

//Setting up route
angular.module('prayerrequests').config(['$stateProvider',
	function($stateProvider) {
		// Prayerrequests state routing
		$stateProvider.
		state('listPrayerrequests', {
			url: '/prayerrequests',
			templateUrl: 'modules/prayerrequests/views/list-prayerrequests.client.view.html'
		}).
		state('createPrayerrequest', {
			url: '/prayerrequests/create',
			templateUrl: 'modules/prayerrequests/views/create-prayerrequest.client.view.html'
		}).
		state('viewPrayerrequest', {
			url: '/prayerrequests/:prayerrequestId',
			templateUrl: 'modules/prayerrequests/views/view-prayerrequest.client.view.html'
		}).
		state('editPrayerrequest', {
			url: '/prayerrequests/:prayerrequestId/edit',
			templateUrl: 'modules/prayerrequests/views/edit-prayerrequest.client.view.html'
		});
	}
]);