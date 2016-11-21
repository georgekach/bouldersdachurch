'use strict';

// Configuring the Articles module
angular.module('songrequests').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('top-admin', 'Song Requests', 'songrequests', 'dropdown', '/songrequests(/create)?');
		Menus.addSubMenuItem('top-admin', 'songrequests', 'List Song Requests', 'songrequests');
		Menus.addSubMenuItem('top-admin', 'songrequests', 'New Song Request', 'songrequests/create');
	}
]);
