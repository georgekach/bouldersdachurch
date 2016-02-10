'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.ministries = [{name:'Mens Ministries',description:' Adventist mens Ministries', contact:'test@mail.com'},
			{name:'Childrens Ministries',description:'Childrens Minsistry',contact:'test2@mail.com'}];

		$scope.upcomingevents = [{eventdate:new Date(2016, 2, 1, 9, 0, 0, 0),eventtitle:' Event 1',startingtime:'09:00',location:'a Location of where its happening'}
		,{eventdate:new Date(2016, 2, 1, 9, 0, 0, 0),eventtitle:' Event 1',startingtime:'09:00',location:'a Location of where its happening'},
			{eventdate:new Date(2016, 2, 1, 9, 0, 0, 0),eventtitle:' Event 1',startingtime:'09:00',location:'a Location of where its happening'}]

	}
]);
