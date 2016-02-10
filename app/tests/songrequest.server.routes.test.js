'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Songrequest = mongoose.model('Songrequest'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, songrequest;

/**
 * Songrequest routes tests
 */
describe('Songrequest CRUD tests', function() {
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

		// Save a user to the test db and create new Songrequest
		user.save(function() {
			songrequest = {
				name: 'Songrequest Name'
			};

			done();
		});
	});

	it('should be able to save Songrequest instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Songrequest
				agent.post('/songrequests')
					.send(songrequest)
					.expect(200)
					.end(function(songrequestSaveErr, songrequestSaveRes) {
						// Handle Songrequest save error
						if (songrequestSaveErr) done(songrequestSaveErr);

						// Get a list of Songrequests
						agent.get('/songrequests')
							.end(function(songrequestsGetErr, songrequestsGetRes) {
								// Handle Songrequest save error
								if (songrequestsGetErr) done(songrequestsGetErr);

								// Get Songrequests list
								var songrequests = songrequestsGetRes.body;

								// Set assertions
								(songrequests[0].user._id).should.equal(userId);
								(songrequests[0].name).should.match('Songrequest Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Songrequest instance if not logged in', function(done) {
		agent.post('/songrequests')
			.send(songrequest)
			.expect(401)
			.end(function(songrequestSaveErr, songrequestSaveRes) {
				// Call the assertion callback
				done(songrequestSaveErr);
			});
	});

	it('should not be able to save Songrequest instance if no name is provided', function(done) {
		// Invalidate name field
		songrequest.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Songrequest
				agent.post('/songrequests')
					.send(songrequest)
					.expect(400)
					.end(function(songrequestSaveErr, songrequestSaveRes) {
						// Set message assertion
						(songrequestSaveRes.body.message).should.match('Please fill Songrequest name');
						
						// Handle Songrequest save error
						done(songrequestSaveErr);
					});
			});
	});

	it('should be able to update Songrequest instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Songrequest
				agent.post('/songrequests')
					.send(songrequest)
					.expect(200)
					.end(function(songrequestSaveErr, songrequestSaveRes) {
						// Handle Songrequest save error
						if (songrequestSaveErr) done(songrequestSaveErr);

						// Update Songrequest name
						songrequest.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Songrequest
						agent.put('/songrequests/' + songrequestSaveRes.body._id)
							.send(songrequest)
							.expect(200)
							.end(function(songrequestUpdateErr, songrequestUpdateRes) {
								// Handle Songrequest update error
								if (songrequestUpdateErr) done(songrequestUpdateErr);

								// Set assertions
								(songrequestUpdateRes.body._id).should.equal(songrequestSaveRes.body._id);
								(songrequestUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Songrequests if not signed in', function(done) {
		// Create new Songrequest model instance
		var songrequestObj = new Songrequest(songrequest);

		// Save the Songrequest
		songrequestObj.save(function() {
			// Request Songrequests
			request(app).get('/songrequests')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Songrequest if not signed in', function(done) {
		// Create new Songrequest model instance
		var songrequestObj = new Songrequest(songrequest);

		// Save the Songrequest
		songrequestObj.save(function() {
			request(app).get('/songrequests/' + songrequestObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', songrequest.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Songrequest instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Songrequest
				agent.post('/songrequests')
					.send(songrequest)
					.expect(200)
					.end(function(songrequestSaveErr, songrequestSaveRes) {
						// Handle Songrequest save error
						if (songrequestSaveErr) done(songrequestSaveErr);

						// Delete existing Songrequest
						agent.delete('/songrequests/' + songrequestSaveRes.body._id)
							.send(songrequest)
							.expect(200)
							.end(function(songrequestDeleteErr, songrequestDeleteRes) {
								// Handle Songrequest error error
								if (songrequestDeleteErr) done(songrequestDeleteErr);

								// Set assertions
								(songrequestDeleteRes.body._id).should.equal(songrequestSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Songrequest instance if not signed in', function(done) {
		// Set Songrequest user 
		songrequest.user = user;

		// Create new Songrequest model instance
		var songrequestObj = new Songrequest(songrequest);

		// Save the Songrequest
		songrequestObj.save(function() {
			// Try deleting Songrequest
			request(app).delete('/songrequests/' + songrequestObj._id)
			.expect(401)
			.end(function(songrequestDeleteErr, songrequestDeleteRes) {
				// Set message assertion
				(songrequestDeleteRes.body.message).should.match('User is not logged in');

				// Handle Songrequest error error
				done(songrequestDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Songrequest.remove().exec();
		done();
	});
});