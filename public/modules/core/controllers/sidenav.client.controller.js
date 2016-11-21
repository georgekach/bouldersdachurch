/**
 * Created by George on 3/1/2016.
 */
'use strict';
angular.module('core').controller('SidenavController', ['$scope', 'Authentication', 'Menus',
    function($scope, Authentication, Menus) {
        $scope.authentication = Authentication;
        $scope.isCollapsed = false;
        $scope.sidemenu = Menus.getMenu('top-admin');

        console.log($scope.sidemenu);

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
    }
]);
