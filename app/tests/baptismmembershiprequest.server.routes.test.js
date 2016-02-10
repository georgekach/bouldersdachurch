'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Baptismmembershiprequest = mongoose.model('Baptismmembershiprequest'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, baptismmembershiprequest;

/**
 * Baptismmembershiprequest routes tests
 */
describe('Baptismmembershiprequest CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Baptismmembershiprequest
		user.save(function() {
			baptismmembershiprequest = {
				name: 'Baptismmembershiprequest Name'
			};

			done();
		});
	});

	it('should be able to save Baptismmembershiprequest instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Baptismmembershiprequest
				agent.post('/baptismmembershiprequests')
					.send(baptismmembershiprequest)
					.expect(200)
					.end(function(baptismmembershiprequestSaveErr, baptismmembershiprequestSaveRes) {
						// Handle Baptismmembershiprequest save error
						if (baptismmembershiprequestSaveErr) done(baptismmembershiprequestSaveErr);

						// Get a list of Baptismmembershiprequests
						agent.get('/baptismmembershiprequests')
							.end(function(baptismmembershiprequestsGetErr, baptismmembershiprequestsGetRes) {
								// Handle Baptismmembershiprequest save error
								if (baptismmembershiprequestsGetErr) done(baptismmembershiprequestsGetErr);

								// Get Baptismmembershiprequests list
								var baptismmembershiprequests = baptismmembershiprequestsGetRes.body;

								// Set assertions
								(baptismmembershiprequests[0].user._id).should.equal(userId);
								(baptismmembershiprequests[0].name).should.match('Baptismmembershiprequest Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Baptismmembershiprequest instance if not logged in', function(done) {
		agent.post('/baptismmembershiprequests')
			.send(baptismmembershiprequest)
			.expect(401)
			.end(function(baptismmembershiprequestSaveErr, baptismmembershiprequestSaveRes) {
				// Call the assertion callback
				done(baptismmembershiprequestSaveErr);
			});
	});

	it('should not be able to save Baptismmembershiprequest instance if no name is provided', function(done) {
		// Invalidate name field
		baptismmembershiprequest.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Baptismmembershiprequest
				agent.post('/baptismmembershiprequests')
					.send(baptismmembershiprequest)
					.expect(400)
					.end(function(baptismmembershiprequestSaveErr, baptismmembershiprequestSaveRes) {
						// Set message assertion
						(baptismmembershiprequestSaveRes.body.message).should.match('Please fill Baptismmembershiprequest name');
						
						// Handle Baptismmembershiprequest save error
						done(baptismmembershiprequestSaveErr);
					});
			});
	});

	it('should be able to update Baptismmembershiprequest instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Baptismmembershiprequest
				agent.post('/baptismmembershiprequests')
					.send(baptismmembershiprequest)
					.expect(200)
					.end(function(baptismmembershiprequestSaveErr, baptismmembershiprequestSaveRes) {
						// Handle Baptismmembershiprequest save error
						if (baptismmembershiprequestSaveErr) done(baptismmembershiprequestSaveErr);

						// Update Baptismmembershiprequest name
						baptismmembershiprequest.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Baptismmembershiprequest
						agent.put('/baptismmembershiprequests/' + baptismmembershiprequestSaveRes.body._id)
							.send(baptismmembershiprequest)
							.expect(200)
							.end(function(baptismmembershiprequestUpdateErr, baptismmembershiprequestUpdateRes) {
								// Handle Baptismmembershiprequest update error
								if (baptismmembershiprequestUpdateErr) done(baptismmembershiprequestUpdateErr);

								// Set assertions
								(baptismmembershiprequestUpdateRes.body._id).should.equal(baptismmembershiprequestSaveRes.body._id);
								(baptismmembershiprequestUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Baptismmembershiprequests if not signed in', function(done) {
		// Create new Baptismmembershiprequest model instance
		var baptismmembershiprequestObj = new Baptismmembershiprequest(baptismmembershiprequest);

		// Save the Baptismmembershiprequest
		baptismmembershiprequestObj.save(function() {
			// Request Baptismmembershiprequests
			request(app).get('/baptismmembershiprequests')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Baptismmembershiprequest if not signed in', function(done) {
		// Create new Baptismmembershiprequest model instance
		var baptismmembershiprequestObj = new Baptismmembershiprequest(baptismmembershiprequest);

		// Save the Baptismmembershiprequest
		baptismmembershiprequestObj.save(function() {
			request(app).get('/baptismmembershiprequests/' + baptismmembershiprequestObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', baptismmembershiprequest.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Baptismmembershiprequest instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Baptismmembershiprequest
				agent.post('/baptismmembershiprequests')
					.send(baptismmembershiprequest)
					.expect(200)
					.end(function(baptismmembershiprequestSaveErr, baptismmembershiprequestSaveRes) {
						// Handle Baptismmembershiprequest save error
						if (baptismmembershiprequestSaveErr) done(baptismmembershiprequestSaveErr);

						// Delete existing Baptismmembershiprequest
						agent.delete('/baptismmembershiprequests/' + baptismmembershiprequestSaveRes.body._id)
							.send(baptismmembershiprequest)
							.expect(200)
							.end(function(baptismmembershiprequestDeleteErr, baptismmembershiprequestDeleteRes) {
								// Handle Baptismmembershiprequest error error
								if (baptismmembershiprequestDeleteErr) done(baptismmembershiprequestDeleteErr);

								// Set assertions
								(baptismmembershiprequestDeleteRes.body._id).should.equal(baptismmembershiprequestSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Baptismmembershiprequest instance if not signed in', function(done) {
		// Set Baptismmembershiprequest user 
		baptismmembershiprequest.user = user;

		// Create new Baptismmembershiprequest model instance
		var baptismmembershiprequestObj = new Baptismmembershiprequest(baptismmembershiprequest);

		// Save the Baptismmembershiprequest
		baptismmembershiprequestObj.save(function() {
			// Try deleting Baptismmembershiprequest
			request(app).delete('/baptismmembershiprequests/' + baptismmembershiprequestObj._id)
			.expect(401)
			.end(function(baptismmembershiprequestDeleteErr, baptismmembershiprequestDeleteRes) {
				// Set message assertion
				(baptismmembershiprequestDeleteRes.body.message).should.match('User is not logged in');

				// Handle Baptismmembershiprequest error error
				done(baptismmembershiprequestDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Baptismmembershiprequest.remove().exec();
		done();
	});
});