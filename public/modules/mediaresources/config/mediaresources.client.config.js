'use strict';

// Configuring the Articles module
angular.module('mediaresources').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Mediaresources', 'mediaresources', 'dropdown', '/mediaresources(/create)?');
		Menus.addSubMenuItem('topbar', 'mediaresources', 'List Mediaresources', 'mediaresources');
		Menus.addSubMenuItem('topbar', 'mediaresources', 'New Mediaresource', 'mediaresources/create');
	}
]);