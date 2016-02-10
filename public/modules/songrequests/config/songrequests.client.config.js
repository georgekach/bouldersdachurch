'use strict';

// Configuring the Articles module
angular.module('songrequests').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Songrequests', 'songrequests', 'dropdown', '/songrequests(/create)?');
		Menus.addSubMenuItem('topbar', 'songrequests', 'List Songrequests', 'songrequests');
		Menus.addSubMenuItem('topbar', 'songrequests', 'New Songrequest', 'songrequests/create');
	}
]);