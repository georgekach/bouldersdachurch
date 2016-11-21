'use strict';

// Configuring the Articles module
angular.module('ministries').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('top-admin', 'Ministries', 'ministries', 'dropdown', '/ministries(/create)?');
		Menus.addSubMenuItem('top-admin', 'ministries', 'List Ministries', 'ministries');
		Menus.addSubMenuItem('top-admin', 'ministries', 'New Ministry', 'ministries/create');
	}
]);
