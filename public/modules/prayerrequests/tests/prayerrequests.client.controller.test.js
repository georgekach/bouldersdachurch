'use strict';

(function() {
	// Prayerrequests Controller Spec
	describe('Prayerrequests Controller Tests', function() {
		// Initialize global variables
		var PrayerrequestsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Prayerrequests controller.
			PrayerrequestsController = $controller('PrayerrequestsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Prayerrequest object fetched from XHR', inject(function(Prayerrequests) {
			// Create sample Prayerrequest using the Prayerrequests service
			var samplePrayerrequest = new Prayerrequests({
				name: 'New Prayerrequest'
			});

			// Create a sample Prayerrequests array that includes the new Prayerrequest
			var samplePrayerrequests = [samplePrayerrequest];

			// Set GET response
			$httpBackend.expectGET('prayerrequests').respond(samplePrayerrequests);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.prayerrequests).toEqualData(samplePrayerrequests);
		}));

		it('$scope.findOne() should create an array with one Prayerrequest object fetched from XHR using a prayerrequestId URL parameter', inject(function(Prayerrequests) {
			// Define a sample Prayerrequest object
			var samplePrayerrequest = new Prayerrequests({
				name: 'New Prayerrequest'
			});

			// Set the URL parameter
			$stateParams.prayerrequestId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/prayerrequests\/([0-9a-fA-F]{24})$/).respond(samplePrayerrequest);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.prayerrequest).toEqualData(samplePrayerrequest);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Prayerrequests) {
			// Create a sample Prayerrequest object
			var samplePrayerrequestPostData = new Prayerrequests({
				name: 'New Prayerrequest'
			});

			// Create a sample Prayerrequest response
			var samplePrayerrequestResponse = new Prayerrequests({
				_id: '525cf20451979dea2c000001',
				name: 'New Prayerrequest'
			});

			// Fixture mock form input values
			scope.name = 'New Prayerrequest';

			// Set POST response
			$httpBackend.expectPOST('prayerrequests', samplePrayerrequestPostData).respond(samplePrayerrequestResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Prayerrequest was created
			expect($location.path()).toBe('/prayerrequests/' + samplePrayerrequestResponse._id);
		}));

		it('$scope.update() should update a valid Prayerrequest', inject(function(Prayerrequests) {
			// Define a sample Prayerrequest put data
			var samplePrayerrequestPutData = new Prayerrequests({
				_id: '525cf20451979dea2c000001',
				name: 'New Prayerrequest'
			});

			// Mock Prayerrequest in scope
			scope.prayerrequest = samplePrayerrequestPutData;

			// Set PUT response
			$httpBackend.expectPUT(/prayerrequests\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/prayerrequests/' + samplePrayerrequestPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid prayerrequestId and remove the Prayerrequest from the scope', inject(function(Prayerrequests) {
			// Create new Prayerrequest object
			var samplePrayerrequest = new Prayerrequests({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Prayerrequests array and include the Prayerrequest
			scope.prayerrequests = [samplePrayerrequest];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/prayerrequests\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePrayerrequest);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.prayerrequests.length).toBe(0);
		}));
	});
}());