'use strict';

// Configuring the Articles module
angular.module('prayerrequests').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Prayerrequests', 'prayerrequests', 'dropdown', '/prayerrequests(/create)?');
		Menus.addSubMenuItem('topbar', 'prayerrequests', 'List Prayerrequests', 'prayerrequests');
		Menus.addSubMenuItem('topbar', 'prayerrequests', 'New Prayerrequest', 'prayerrequests/create');
	}
]);