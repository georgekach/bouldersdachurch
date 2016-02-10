'use strict';

(function() {
	// Ourbeliefs Controller Spec
	describe('Ourbeliefs Controller Tests', function() {
		// Initialize global variables
		var OurbeliefsController,
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

			// Initialize the Ourbeliefs controller.
			OurbeliefsController = $controller('OurbeliefsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Ourbelief object fetched from XHR', inject(function(Ourbeliefs) {
			// Create sample Ourbelief using the Ourbeliefs service
			var sampleOurbelief = new Ourbeliefs({
				name: 'New Ourbelief'
			});

			// Create a sample Ourbeliefs array that includes the new Ourbelief
			var sampleOurbeliefs = [sampleOurbelief];

			// Set GET response
			$httpBackend.expectGET('ourbeliefs').respond(sampleOurbeliefs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ourbeliefs).toEqualData(sampleOurbeliefs);
		}));

		it('$scope.findOne() should create an array with one Ourbelief object fetched from XHR using a ourbeliefId URL parameter', inject(function(Ourbeliefs) {
			// Define a sample Ourbelief object
			var sampleOurbelief = new Ourbeliefs({
				name: 'New Ourbelief'
			});

			// Set the URL parameter
			$stateParams.ourbeliefId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/ourbeliefs\/([0-9a-fA-F]{24})$/).respond(sampleOurbelief);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.ourbelief).toEqualData(sampleOurbelief);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Ourbeliefs) {
			// Create a sample Ourbelief object
			var sampleOurbeliefPostData = new Ourbeliefs({
				name: 'New Ourbelief'
			});

			// Create a sample Ourbelief response
			var sampleOurbeliefResponse = new Ourbeliefs({
				_id: '525cf20451979dea2c000001',
				name: 'New Ourbelief'
			});

			// Fixture mock form input values
			scope.name = 'New Ourbelief';

			// Set POST response
			$httpBackend.expectPOST('ourbeliefs', sampleOurbeliefPostData).respond(sampleOurbeliefResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Ourbelief was created
			expect($location.path()).toBe('/ourbeliefs/' + sampleOurbeliefResponse._id);
		}));

		it('$scope.update() should update a valid Ourbelief', inject(function(Ourbeliefs) {
			// Define a sample Ourbelief put data
			var sampleOurbeliefPutData = new Ourbeliefs({
				_id: '525cf20451979dea2c000001',
				name: 'New Ourbelief'
			});

			// Mock Ourbelief in scope
			scope.ourbelief = sampleOurbeliefPutData;

			// Set PUT response
			$httpBackend.expectPUT(/ourbeliefs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/ourbeliefs/' + sampleOurbeliefPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid ourbeliefId and remove the Ourbelief from the scope', inject(function(Ourbeliefs) {
			// Create new Ourbelief object
			var sampleOurbelief = new Ourbeliefs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Ourbeliefs array and include the Ourbelief
			scope.ourbeliefs = [sampleOurbelief];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/ourbeliefs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleOurbelief);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.ourbeliefs.length).toBe(0);
		}));
	});
}());