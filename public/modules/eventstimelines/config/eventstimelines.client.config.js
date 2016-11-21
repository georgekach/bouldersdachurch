'use strict';

// Configuring the Articles module
angular.module('eventstimelines').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('top-admin', 'Events Timeline', 'eventstimelines', 'dropdown', '/eventstimelines(/create)?');
		Menus.addSubMenuItem('top-admin', 'eventstimelines', 'List Events', 'eventstimelines');
		Menus.addSubMenuItem('top-admin', 'eventstimelines', 'New Event', 'eventstimelines/create');
	}
]);
