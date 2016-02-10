'use strict';

(function() {
	// Mediaresources Controller Spec
	describe('Mediaresources Controller Tests', function() {
		// Initialize global variables
		var MediaresourcesController,
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

			// Initialize the Mediaresources controller.
			MediaresourcesController = $controller('MediaresourcesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Mediaresource object fetched from XHR', inject(function(Mediaresources) {
			// Create sample Mediaresource using the Mediaresources service
			var sampleMediaresource = new Mediaresources({
				name: 'New Mediaresource'
			});

			// Create a sample Mediaresources array that includes the new Mediaresource
			var sampleMediaresources = [sampleMediaresource];

			// Set GET response
			$httpBackend.expectGET('mediaresources').respond(sampleMediaresources);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.mediaresources).toEqualData(sampleMediaresources);
		}));

		it('$scope.findOne() should create an array with one Mediaresource object fetched from XHR using a mediaresourceId URL parameter', inject(function(Mediaresources) {
			// Define a sample Mediaresource object
			var sampleMediaresource = new Mediaresources({
				name: 'New Mediaresource'
			});

			// Set the URL parameter
			$stateParams.mediaresourceId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/mediaresources\/([0-9a-fA-F]{24})$/).respond(sampleMediaresource);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.mediaresource).toEqualData(sampleMediaresource);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Mediaresources) {
			// Create a sample Mediaresource object
			var sampleMediaresourcePostData = new Mediaresources({
				name: 'New Mediaresource'
			});

			// Create a sample Mediaresource response
			var sampleMediaresourceResponse = new Mediaresources({
				_id: '525cf20451979dea2c000001',
				name: 'New Mediaresource'
			});

			// Fixture mock form input values
			scope.name = 'New Mediaresource';

			// Set POST response
			$httpBackend.expectPOST('mediaresources', sampleMediaresourcePostData).respond(sampleMediaresourceResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Mediaresource was created
			expect($location.path()).toBe('/mediaresources/' + sampleMediaresourceResponse._id);
		}));

		it('$scope.update() should update a valid Mediaresource', inject(function(Mediaresources) {
			// Define a sample Mediaresource put data
			var sampleMediaresourcePutData = new Mediaresources({
				_id: '525cf20451979dea2c000001',
				name: 'New Mediaresource'
			});

			// Mock Mediaresource in scope
			scope.mediaresource = sampleMediaresourcePutData;

			// Set PUT response
			$httpBackend.expectPUT(/mediaresources\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/mediaresources/' + sampleMediaresourcePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid mediaresourceId and remove the Mediaresource from the scope', inject(function(Mediaresources) {
			// Create new Mediaresource object
			var sampleMediaresource = new Mediaresources({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Mediaresources array and include the Mediaresource
			scope.mediaresources = [sampleMediaresource];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/mediaresources\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMediaresource);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.mediaresources.length).toBe(0);
		}));
	});
}());