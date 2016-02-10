'use strict';

// Mediaresources controller
angular.module('mediaresources').controller('MediaresourcesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Mediaresources',
	function($scope, $stateParams, $location, Authentication, Mediaresources) {
		$scope.authentication = Authentication;

		// Create new Mediaresource
		$scope.create = function() {
			// Create new Mediaresource object
			var mediaresource = new Mediaresources ({
				name: this.name
			});

			// Redirect after save
			mediaresource.$save(function(response) {
				$location.path('mediaresources/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Mediaresource
		$scope.remove = function(mediaresource) {
			if ( mediaresource ) { 
				mediaresource.$remove();

				for (var i in $scope.mediaresources) {
					if ($scope.mediaresources [i] === mediaresource) {
						$scope.mediaresources.splice(i, 1);
					}
				}
			} else {
				$scope.mediaresource.$remove(function() {
					$location.path('mediaresources');
				});
			}
		};

		// Update existing Mediaresource
		$scope.update = function() {
			var mediaresource = $scope.mediaresource;

			mediaresource.$update(function() {
				$location.path('mediaresources/' + mediaresource._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Mediaresources
		$scope.find = function() {
			$scope.mediaresources = Mediaresources.query();
		};

		// Find existing Mediaresource
		$scope.findOne = function() {
			$scope.mediaresource = Mediaresources.get({ 
				mediaresourceId: $stateParams.mediaresourceId
			});
		};
	}
]);