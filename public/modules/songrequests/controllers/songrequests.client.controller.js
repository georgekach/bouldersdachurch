'use strict';

// Songrequests controller
angular.module('songrequests').controller('SongrequestsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Songrequests',
	function($scope, $stateParams, $location, Authentication, Songrequests) {
		$scope.authentication = Authentication;

		// Create new Songrequest
		$scope.create = function() {
			// Create new Songrequest object
			var songrequest = new Songrequests ({
				name: this.name
			});

			// Redirect after save
			songrequest.$save(function(response) {
				$location.path('songrequests/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Songrequest
		$scope.remove = function(songrequest) {
			if ( songrequest ) { 
				songrequest.$remove();

				for (var i in $scope.songrequests) {
					if ($scope.songrequests [i] === songrequest) {
						$scope.songrequests.splice(i, 1);
					}
				}
			} else {
				$scope.songrequest.$remove(function() {
					$location.path('songrequests');
				});
			}
		};

		// Update existing Songrequest
		$scope.update = function() {
			var songrequest = $scope.songrequest;

			songrequest.$update(function() {
				$location.path('songrequests/' + songrequest._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Songrequests
		$scope.find = function() {
			$scope.songrequests = Songrequests.query();
		};

		// Find existing Songrequest
		$scope.findOne = function() {
			$scope.songrequest = Songrequests.get({ 
				songrequestId: $stateParams.songrequestId
			});
		};
	}
]);