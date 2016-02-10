'use strict';

// Prayerrequests controller
angular.module('prayerrequests').controller('PrayerrequestsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Prayerrequests',
	function($scope, $stateParams, $location, Authentication, Prayerrequests) {
		$scope.authentication = Authentication;

		// Create new Prayerrequest
		$scope.create = function() {
			// Create new Prayerrequest object
			var prayerrequest = new Prayerrequests ({
				name: this.name
			});

			// Redirect after save
			prayerrequest.$save(function(response) {
				$location.path('prayerrequests/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Prayerrequest
		$scope.remove = function(prayerrequest) {
			if ( prayerrequest ) { 
				prayerrequest.$remove();

				for (var i in $scope.prayerrequests) {
					if ($scope.prayerrequests [i] === prayerrequest) {
						$scope.prayerrequests.splice(i, 1);
					}
				}
			} else {
				$scope.prayerrequest.$remove(function() {
					$location.path('prayerrequests');
				});
			}
		};

		// Update existing Prayerrequest
		$scope.update = function() {
			var prayerrequest = $scope.prayerrequest;

			prayerrequest.$update(function() {
				$location.path('prayerrequests/' + prayerrequest._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Prayerrequests
		$scope.find = function() {
			$scope.prayerrequests = Prayerrequests.query();
		};

		// Find existing Prayerrequest
		$scope.findOne = function() {
			$scope.prayerrequest = Prayerrequests.get({ 
				prayerrequestId: $stateParams.prayerrequestId
			});
		};
	}
]);