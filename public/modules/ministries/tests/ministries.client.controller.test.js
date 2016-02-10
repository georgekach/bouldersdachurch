'use strict';

(function() {
	// Ministries Controller Spec
	describe('Ministries Controller Tests', function() {
		// Initialize global variables
		var MinistriesController,
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

			// Initialize the Ministries controller.
			MinistriesController = $controller('MinistriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Ministry object fetched from XHR', inject(function(Ministries) {
			// Create sample Ministry using the Ministries service
			var sampleMinistry = new Ministries({
				name: 'New Ministry'
			});

			// Create a sample Ministries array that includes the new Ministry
			var sampleMinistries = [sampleMinistry];

			// Set GET response
			$httpBackend.expectGET('ministries').respond(sampleMinistries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ministries).toEqualData(sampleMinistries);
		}));

		it('$scope.findOne() should create an array with one Ministry object fetched from XHR using a ministryId URL parameter', inject(function(Ministries) {
			// Define a sample Ministry object
			var sampleMinistry = new Ministries({
				name: 'New Ministry'
			});

			// Set the URL parameter
			$stateParams.ministryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/ministries\/([0-9a-fA-F]{24})$/).respond(sampleMinistry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ministry).toEqualData(sampleMinistry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Ministries) {
			// Create a sample Ministry object
			var sampleMinistryPostData = new Ministries({
				name: 'New Ministry'
			});

			// Create a sample Ministry response
			var sampleMinistryResponse = new Ministries({
				_id: '525cf20451979dea2c000001',
				name: 'New Ministry'
			});

			// Fixture mock form input values
			scope.name = 'New Ministry';

			// Set POST response
			$httpBackend.expectPOST('ministries', sampleMinistryPostData).respond(sampleMinistryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Ministry was created
			expect($location.path()).toBe('/ministries/' + sampleMinistryResponse._id);
		}));

		it('$scope.update() should update a valid Ministry', inject(function(Ministries) {
			// Define a sample Ministry put data
			var sampleMinistryPutData = new Ministries({
				_id: '525cf20451979dea2c000001',
				name: 'New Ministry'
			});

			// Mock Ministry in scope
			scope.ministry = sampleMinistryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/ministries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/ministries/' + sampleMinistryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid ministryId and remove the Ministry from the scope', inject(function(Ministries) {
			// Create new Ministry object
			var sampleMinistry = new Ministries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Ministries array and include the Ministry
			scope.ministries = [sampleMinistry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/ministries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMinistry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.ministries.length).toBe(0);
		}));
	});
}());