'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		$scope.toggleMenuButton = function(){
			document.getElementById('nav-toggle').classList.toggle('active');

		};

		document.querySelector( '#nav-toggle' )
			.addEventListener( 'click', function() {
				this.classList.toggle( 'active' );
			});


	}
]);
