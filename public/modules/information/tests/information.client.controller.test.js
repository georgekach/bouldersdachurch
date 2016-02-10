'use strict';

(function() {
	// Information Controller Spec
	describe('Information Controller Tests', function() {
		// Initialize global variables
		var InformationController,
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

			// Initialize the Information controller.
			InformationController = $controller('InformationController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Information object fetched from XHR', inject(function(Information) {
			// Create sample Information using the Information service
			var sampleInformation = new Information({
				name: 'New Information'
			});

			// Create a sample Information array that includes the new Information
			var sampleInformation1 = [sampleInformation];

			// Set GET response
			$httpBackend.expectGET('information').respond(sampleInformation1);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.information).toEqualData(sampleInformation);
		}));

		it('$scope.findOne() should create an array with one Information object fetched from XHR using a informationId URL parameter', inject(function(Information) {
			// Define a sample Information object
			var sampleInformation = new Information({
				name: 'New Information'
			});

			// Set the URL parameter
			$stateParams.informationId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/information\/([0-9a-fA-F]{24})$/).respond(sampleInformation);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.information).toEqualData(sampleInformation);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Information) {
			// Create a sample Information object
			var sampleInformationPostData = new Information({
				name: 'New Information'
			});

			// Create a sample Information response
			var sampleInformationResponse = new Information({
				_id: '525cf20451979dea2c000001',
				name: 'New Information'
			});

			// Fixture mock form input values
			scope.name = 'New Information';

			// Set POST response
			$httpBackend.expectPOST('information', sampleInformationPostData).respond(sampleInformationResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Information was created
			expect($location.path()).toBe('/information/' + sampleInformationResponse._id);
		}));

		it('$scope.update() should update a valid Information', inject(function(Information) {
			// Define a sample Information put data
			var sampleInformationPutData = new Information({
				_id: '525cf20451979dea2c000001',
				name: 'New Information'
			});

			// Mock Information in scope
			scope.information = sampleInformationPutData;

			// Set PUT response
			$httpBackend.expectPUT(/information\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/information/' + sampleInformationPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid informationId and remove the Information from the scope', inject(function(Information) {
			// Create new Information object
			var sampleInformation = new Information({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Information array and include the Information
			scope.information = [sampleInformation];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/information\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleInformation);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.information.length).toBe(0);
		}));
	});
}());
