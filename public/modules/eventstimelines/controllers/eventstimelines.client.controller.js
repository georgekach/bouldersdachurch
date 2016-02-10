'use strict';

// Eventstimelines controller
angular.module('eventstimelines').controller('EventstimelinesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Eventstimelines',
	function($scope, $stateParams, $location, Authentication, Eventstimelines) {
		$scope.authentication = Authentication;

		// Create new Eventstimeline
		$scope.create = function() {
			// Create new Eventstimeline object
			var eventstimeline = new Eventstimelines ({
				name: this.name
			});

			// Redirect after save
			eventstimeline.$save(function(response) {
				$location.path('eventstimelines/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Eventstimeline
		$scope.remove = function(eventstimeline) {
			if ( eventstimeline ) { 
				eventstimeline.$remove();

				for (var i in $scope.eventstimelines) {
					if ($scope.eventstimelines [i] === eventstimeline) {
						$scope.eventstimelines.splice(i, 1);
					}
				}
			} else {
				$scope.eventstimeline.$remove(function() {
					$location.path('eventstimelines');
				});
			}
		};

		// Update existing Eventstimeline
		$scope.update = function() {
			var eventstimeline = $scope.eventstimeline;

			eventstimeline.$update(function() {
				$location.path('eventstimelines/' + eventstimeline._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Eventstimelines
		$scope.find = function() {
			$scope.eventstimelines = Eventstimelines.query();
		};

		// Find existing Eventstimeline
		$scope.findOne = function() {
			$scope.eventstimeline = Eventstimelines.get({ 
				eventstimelineId: $stateParams.eventstimelineId
			});
		};
	}
]);