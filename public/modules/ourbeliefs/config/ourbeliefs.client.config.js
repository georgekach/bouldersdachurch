'use strict';

// Configuring the Articles module
angular.module('ourbeliefs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Beliefs', 'ourbeliefs', 'dropdown', '/ourbeliefs(/create)?');
		Menus.addSubMenuItem('topbar', 'ourbeliefs', 'List Ourbeliefs', 'ourbeliefs');
		Menus.addSubMenuItem('topbar', 'ourbeliefs', 'New Ourbelief', 'ourbeliefs/create');
	}
]);
