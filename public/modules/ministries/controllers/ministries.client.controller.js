'use strict';

// Ministries controller
angular.module('ministries').controller('MinistriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ministries',
	function($scope, $stateParams, $location, Authentication, Ministries) {
		$scope.authentication = Authentication;

		// Create new Ministry
		$scope.create = function() {
			// Create new Ministry object
			var ministry = new Ministries ({
				name: this.name,
				description: this.description,
				contact: this.contact
			});

			// Redirect after save
			ministry.$save(function(response) {
				$location.path('ministries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Ministry
		$scope.remove = function(ministry) {
			if ( ministry ) { 
				ministry.$remove();

				for (var i in $scope.ministries) {
					if ($scope.ministries [i] === ministry) {
						$scope.ministries.splice(i, 1);
					}
				}
			} else {
				$scope.ministry.$remove(function() {
					$location.path('ministries');
				});
			}
		};

		// Update existing Ministry
		$scope.update = function() {
			var ministry = $scope.ministry;

			ministry.$update(function() {
				$location.path('ministries/' + ministry._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Ministries
		$scope.find = function() {
			$scope.ministries = Ministries.query();
		};

		// Find existing Ministry
		$scope.findOne = function() {
			$scope.ministry = Ministries.get({ 
				ministryId: $stateParams.ministryId
			});
		};
	}
]);
