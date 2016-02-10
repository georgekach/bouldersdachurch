'use strict';

// Information controller
angular.module('information').controller('InformationController', ['$scope', '$stateParams', '$location', 'Authentication', 'Information',
	function($scope, $stateParams, $location, Authentication, Information) {
		$scope.authentication = Authentication;

		// Create new Information
		$scope.create = function() {
			// Create new Information object
			var information = new Information ({
				name: this.name,
				rankingnumber: this.rankingnumber,
				emailaddress: this.emailaddress,
				contactnumber: this.contactnumber,
				officersposition: this.officersposition
			});

			// Redirect after save
			information.$save(function(response) {
				$location.path('information/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Information
		$scope.remove = function(information) {
			if ( information ) { 
				information.$remove();

				for (var i in $scope.information) {
					if ($scope.information [i] === information) {
						$scope.information.splice(i, 1);
					}
				}
			} else {
				$scope.information.$remove(function() {
					$location.path('information');
				});
			}
		};

		// Update existing Information
		$scope.update = function() {
			var information = $scope.information;

			information.$update(function() {
				$location.path('information/' + information._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Information
		$scope.find = function() {
			$scope.information = Information.query();
		};

		// Find existing Information
		$scope.findOne = function() {
			$scope.information = Information.get({ 
				informationId: $stateParams.informationId
			});
		};
	}
]);
