'use strict';

(function() {
	// Eventstimelines Controller Spec
	describe('Eventstimelines Controller Tests', function() {
		// Initialize global variables
		var EventstimelinesController,
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

			// Initialize the Eventstimelines controller.
			EventstimelinesController = $controller('EventstimelinesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Eventstimeline object fetched from XHR', inject(function(Eventstimelines) {
			// Create sample Eventstimeline using the Eventstimelines service
			var sampleEventstimeline = new Eventstimelines({
				name: 'New Eventstimeline'
			});

			// Create a sample Eventstimelines array that includes the new Eventstimeline
			var sampleEventstimelines = [sampleEventstimeline];

			// Set GET response
			$httpBackend.expectGET('eventstimelines').respond(sampleEventstimelines);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.eventstimelines).toEqualData(sampleEventstimelines);
		}));

		it('$scope.findOne() should create an array with one Eventstimeline object fetched from XHR using a eventstimelineId URL parameter', inject(function(Eventstimelines) {
			// Define a sample Eventstimeline object
			var sampleEventstimeline = new Eventstimelines({
				name: 'New Eventstimeline'
			});

			// Set the URL parameter
			$stateParams.eventstimelineId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/eventstimelines\/([0-9a-fA-F]{24})$/).respond(sampleEventstimeline);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.eventstimeline).toEqualData(sampleEventstimeline);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Eventstimelines) {
			// Create a sample Eventstimeline object
			var sampleEventstimelinePostData = new Eventstimelines({
				name: 'New Eventstimeline'
			});

			// Create a sample Eventstimeline response
			var sampleEventstimelineResponse = new Eventstimelines({
				_id: '525cf20451979dea2c000001',
				name: 'New Eventstimeline'
			});

			// Fixture mock form input values
			scope.name = 'New Eventstimeline';

			// Set POST response
			$httpBackend.expectPOST('eventstimelines', sampleEventstimelinePostData).respond(sampleEventstimelineResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Eventstimeline was created
			expect($location.path()).toBe('/eventstimelines/' + sampleEventstimelineResponse._id);
		}));

		it('$scope.update() should update a valid Eventstimeline', inject(function(Eventstimelines) {
			// Define a sample Eventstimeline put data
			var sampleEventstimelinePutData = new Eventstimelines({
				_id: '525cf20451979dea2c000001',
				name: 'New Eventstimeline'
			});

			// Mock Eventstimeline in scope
			scope.eventstimeline = sampleEventstimelinePutData;

			// Set PUT response
			$httpBackend.expectPUT(/eventstimelines\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/eventstimelines/' + sampleEventstimelinePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid eventstimelineId and remove the Eventstimeline from the scope', inject(function(Eventstimelines) {
			// Create new Eventstimeline object
			var sampleEventstimeline = new Eventstimelines({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Eventstimelines array and include the Eventstimeline
			scope.eventstimelines = [sampleEventstimeline];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/eventstimelines\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEventstimeline);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.eventstimelines.length).toBe(0);
		}));
	});
}());