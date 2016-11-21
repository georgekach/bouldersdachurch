'use strict';

// Configuring the Articles module
angular.module('baptismmembershiprequests').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('top-admin', 'Baptism and Membership Requests', 'baptismmembershiprequests', 'dropdown', '/baptismmembershiprequests(/create)?');
		Menus.addSubMenuItem('top-admin', 'baptismmembershiprequests', 'List Baptism and membership requests', 'baptismmembershiprequests');
		Menus.addSubMenuItem('top-admin', 'baptismmembershiprequests', 'New Baptism and membership request', 'baptismmembershiprequests/create');
	}
]);
