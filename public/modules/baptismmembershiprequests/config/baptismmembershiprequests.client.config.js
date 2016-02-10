'use strict';

// Configuring the Articles module
angular.module('baptismmembershiprequests').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Baptismmembershiprequests', 'baptismmembershiprequests', 'dropdown', '/baptismmembershiprequests(/create)?');
		Menus.addSubMenuItem('topbar', 'baptismmembershiprequests', 'List Baptismmembershiprequests', 'baptismmembershiprequests');
		Menus.addSubMenuItem('topbar', 'baptismmembershiprequests', 'New Baptismmembershiprequest', 'baptismmembershiprequests/create');
	}
]);