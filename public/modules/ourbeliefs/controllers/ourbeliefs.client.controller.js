'use strict';

// Ourbeliefs controller
angular.module('ourbeliefs').controller('OurbeliefsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ourbeliefs',
	function($scope, $stateParams, $location, Authentication, Ourbeliefs) {
		$scope.authentication = Authentication;

		// Create new Ourbelief
		$scope.create = function() {
			// Create new Ourbelief object
			var ourbelief = new Ourbeliefs ({
				name: this.name,
				biblereferences: this.biblereferences,
				description: this.description,
				beleiefnumber: this.beleiefnumber
			});

			// Redirect after save
			ourbelief.$save(function(response) {
				$location.path('ourbeliefs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Ourbelief
		$scope.remove = function(ourbelief) {
			if ( ourbelief ) { 
				ourbelief.$remove();

				for (var i in $scope.ourbeliefs) {
					if ($scope.ourbeliefs [i] === ourbelief) {
						$scope.ourbeliefs.splice(i, 1);
					}
				}
			} else {
				$scope.ourbelief.$remove(function() {
					$location.path('ourbeliefs');
				});
			}
		};

		// Update existing Ourbelief
		$scope.update = function() {
			var ourbelief = $scope.ourbelief;

			ourbelief.$update(function() {
				$location.path('ourbeliefs/' + ourbelief._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Ourbeliefs
		$scope.find = function() {
			$scope.ourbeliefs = Ourbeliefs.query();
		};

		// Find existing Ourbelief
		$scope.findOne = function() {
			$scope.ourbelief = Ourbeliefs.get({ 
				ourbeliefId: $stateParams.ourbeliefId
			});
		};
	}
]);
