'use strict';

// Configuring the Articles module
angular.module('ministries').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Ministries', 'ministries', 'dropdown', '/ministries(/create)?');
		Menus.addSubMenuItem('topbar', 'ministries', 'List Ministries', 'ministries');
		Menus.addSubMenuItem('topbar', 'ministries', 'New Ministry', 'ministries/create');
	}
]);
