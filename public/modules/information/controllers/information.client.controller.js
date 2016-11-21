'use strict';

// Information controller
angular.module('information').controller('InformationController', ['$scope', '$stateParams', '$location', 'Authentication', 'Information','Upload',
	function($scope, $stateParams, $location, Authentication, Information,Upload) {
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

			console.log('im here');
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

		$scope.uploadInProgress = false;
		//File upload
		$scope.onFileSelect = function(image) {
			console.log('am here');
			if (angular.isArray(image)) {
				image = image[0];
			}

			// This is how I handle file types in client side
			if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
				alert('Only PNG and JPEG are accepted.');
				return;
			}
			console.log('am here');
			$scope.uploadInProgress = true;
			$scope.uploadProgress = 0;

			$scope.upload = Upload.upload({
				url: 'upload/image',
				data: {file: image, 'username': $scope.username},
				file: image
			}).then(function (resp) {
				console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
			}, function (resp) {
				console.log('Error status: ' + resp.status);
			}, function (evt) {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			});
		};



	}
]);
