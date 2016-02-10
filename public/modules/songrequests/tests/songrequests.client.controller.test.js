'use strict';

(function() {
	// Songrequests Controller Spec
	describe('Songrequests Controller Tests', function() {
		// Initialize global variables
		var SongrequestsController,
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

			// Initialize the Songrequests controller.
			SongrequestsController = $controller('SongrequestsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Songrequest object fetched from XHR', inject(function(Songrequests) {
			// Create sample Songrequest using the Songrequests service
			var sampleSongrequest = new Songrequests({
				name: 'New Songrequest'
			});

			// Create a sample Songrequests array that includes the new Songrequest
			var sampleSongrequests = [sampleSongrequest];

			// Set GET response
			$httpBackend.expectGET('songrequests').respond(sampleSongrequests);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.songrequests).toEqualData(sampleSongrequests);
		}));

		it('$scope.findOne() should create an array with one Songrequest object fetched from XHR using a songrequestId URL parameter', inject(function(Songrequests) {
			// Define a sample Songrequest object
			var sampleSongrequest = new Songrequests({
				name: 'New Songrequest'
			});

			// Set the URL parameter
			$stateParams.songrequestId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/songrequests\/([0-9a-fA-F]{24})$/).respond(sampleSongrequest);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.songrequest).toEqualData(sampleSongrequest);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Songrequests) {
			// Create a sample Songrequest object
			var sampleSongrequestPostData = new Songrequests({
				name: 'New Songrequest'
			});

			// Create a sample Songrequest response
			var sampleSongrequestResponse = new Songrequests({
				_id: '525cf20451979dea2c000001',
				name: 'New Songrequest'
			});

			// Fixture mock form input values
			scope.name = 'New Songrequest';

			// Set POST response
			$httpBackend.expectPOST('songrequests', sampleSongrequestPostData).respond(sampleSongrequestResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Songrequest was created
			expect($location.path()).toBe('/songrequests/' + sampleSongrequestResponse._id);
		}));

		it('$scope.update() should update a valid Songrequest', inject(function(Songrequests) {
			// Define a sample Songrequest put data
			var sampleSongrequestPutData = new Songrequests({
				_id: '525cf20451979dea2c000001',
				name: 'New Songrequest'
			});

			// Mock Songrequest in scope
			scope.songrequest = sampleSongrequestPutData;

			// Set PUT response
			$httpBackend.expectPUT(/songrequests\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/songrequests/' + sampleSongrequestPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid songrequestId and remove the Songrequest from the scope', inject(function(Songrequests) {
			// Create new Songrequest object
			var sampleSongrequest = new Songrequests({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Songrequests array and include the Songrequest
			scope.songrequests = [sampleSongrequest];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/songrequests\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSongrequest);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.songrequests.length).toBe(0);
		}));
	});
}());