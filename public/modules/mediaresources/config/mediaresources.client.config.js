'use strict';

// Configuring the Articles module
angular.module('mediaresources').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('top-admin', 'Media Resources', 'mediaresources', 'dropdown', '/mediaresources(/create)?');
		Menus.addSubMenuItem('top-admin', 'mediaresources', 'List Media Resources', 'mediaresources');
		Menus.addSubMenuItem('top-admin', 'mediaresources', 'New Media Resource', 'mediaresources/create');
	}
]);
