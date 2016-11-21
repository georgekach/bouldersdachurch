'use strict';

// Baptismmembershiprequests controller
angular.module('baptismmembershiprequests').controller('BaptismmembershiprequestsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Baptismmembershiprequests',
	function($scope, $stateParams, $location, Authentication, Baptismmembershiprequests) {
		$scope.authentication = Authentication;
		$scope.requestType = '';

		// Create new Baptismmembershiprequest
		$scope.create = function() {
			// Create new Baptismmembershiprequest object


			var baptismmembershiprequest = new Baptismmembershiprequests ({
				name: this.name,
				surname: this.surname,
				email: this.email,
				contactnumber: this.contactnumber,
				currentmembership: this.currentmembership
			});

			if($scope.requestType ==='baptism')
			{
				baptismmembershiprequest.membershiptransfer = false;
				baptismmembershiprequest.baptismrequest = true;
			}
			if($scope.requestType ==='membership')
			{
				baptismmembershiprequest.membershiptransfer = true;
				baptismmembershiprequest.baptismrequest = false;
			}

			// Redirect after save
			baptismmembershiprequest.$save(function(response) {
				$location.path('baptismmembershiprequests/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Baptismmembershiprequest
		$scope.remove = function(baptismmembershiprequest) {
			if ( baptismmembershiprequest ) { 
				baptismmembershiprequest.$remove();

				for (var i in $scope.baptismmembershiprequests) {
					if ($scope.baptismmembershiprequests [i] === baptismmembershiprequest) {
						$scope.baptismmembershiprequests.splice(i, 1);
					}
				}
			} else {
				$scope.baptismmembershiprequest.$remove(function() {
					$location.path('baptismmembershiprequests');
				});
			}
		};

		// Update existing Baptismmembershiprequest
		$scope.update = function() {
			var baptismmembershiprequest = $scope.baptismmembershiprequest;

			baptismmembershiprequest.$update(function() {
				$location.path('baptismmembershiprequests/' + baptismmembershiprequest._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Baptismmembershiprequests
		$scope.find = function() {
			$scope.baptismmembershiprequests = Baptismmembershiprequests.query();
		};

		// Find existing Baptismmembershiprequest
		$scope.findOne = function() {
			$scope.baptismmembershiprequest = Baptismmembershiprequests.get({ 
				baptismmembershiprequestId: $stateParams.baptismmembershiprequestId
			});
		};
	}
]);
