'use strict';

// Configuring the Articles module
angular.module('eventstimelines').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Eventstimelines', 'eventstimelines', 'dropdown', '/eventstimelines(/create)?');
		Menus.addSubMenuItem('topbar', 'eventstimelines', 'List Eventstimelines', 'eventstimelines');
		Menus.addSubMenuItem('topbar', 'eventstimelines', 'New Eventstimeline', 'eventstimelines/create');
	}
]);