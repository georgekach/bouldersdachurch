'use strict';

// Configuring the Articles module
angular.module('information').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Information', 'information', 'dropdown', '/information(/create)?');
		Menus.addSubMenuItem('topbar', 'information', 'List Information', 'information');
		Menus.addSubMenuItem('topbar', 'information', 'New Information', 'information/create');
	}
]);