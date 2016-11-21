'use strict';

// Configuring the Articles module
angular.module('prayerrequests').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('top-admin', 'Prayer Requests', 'prayerrequests', 'dropdown', '/prayerrequests(/create)?');
		Menus.addSubMenuItem('top-admin', 'prayerrequests', 'List Prayer Requests', 'prayerrequests');
		Menus.addSubMenuItem('top-admin', 'prayerrequests', 'New Prayer Request', 'prayerrequests/create');
	}
]);
