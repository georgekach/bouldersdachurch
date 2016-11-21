'use strict';

// Configuring the Articles module
angular.module('ourbeliefs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('top-admin', 'Fundamental Beliefs', 'ourbeliefs', 'dropdown', '/ourbeliefs(/create)?');
		Menus.addSubMenuItem('top-admin', 'ourbeliefs', 'List Fundamental Beliefs', 'ourbeliefs');
		Menus.addSubMenuItem('top-admin', 'ourbeliefs', 'New Fundamental Belief', 'ourbeliefs/create');
	}
]);
