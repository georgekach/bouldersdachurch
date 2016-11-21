'use strict';

// Configuring the Articles module
angular.module('information').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('top-admin', 'Information', 'information', 'dropdown', '/information(/create)?');
		Menus.addSubMenuItem('top-admin', 'information', 'List Information', 'information');
		Menus.addSubMenuItem('top-admin', 'information', 'New Information', 'information/create');
	}
]);
