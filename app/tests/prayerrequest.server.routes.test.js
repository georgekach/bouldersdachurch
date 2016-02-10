'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Prayerrequest = mongoose.model('Prayerrequest'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, prayerrequest;

/**
 * Prayerrequest routes tests
 */
describe('Prayerrequest CRUD tests', function() {
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

		// Save a user to the test db and create new Prayerrequest
		user.save(function() {
			prayerrequest = {
				name: 'Prayerrequest Name'
			};

			done();
		});
	});

	it('should be able to save Prayerrequest instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Prayerrequest
				agent.post('/prayerrequests')
					.send(prayerrequest)
					.expect(200)
					.end(function(prayerrequestSaveErr, prayerrequestSaveRes) {
						// Handle Prayerrequest save error
						if (prayerrequestSaveErr) done(prayerrequestSaveErr);

						// Get a list of Prayerrequests
						agent.get('/prayerrequests')
							.end(function(prayerrequestsGetErr, prayerrequestsGetRes) {
								// Handle Prayerrequest save error
								if (prayerrequestsGetErr) done(prayerrequestsGetErr);

								// Get Prayerrequests list
								var prayerrequests = prayerrequestsGetRes.body;

								// Set assertions
								(prayerrequests[0].user._id).should.equal(userId);
								(prayerrequests[0].name).should.match('Prayerrequest Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Prayerrequest instance if not logged in', function(done) {
		agent.post('/prayerrequests')
			.send(prayerrequest)
			.expect(401)
			.end(function(prayerrequestSaveErr, prayerrequestSaveRes) {
				// Call the assertion callback
				done(prayerrequestSaveErr);
			});
	});

	it('should not be able to save Prayerrequest instance if no name is provided', function(done) {
		// Invalidate name field
		prayerrequest.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Prayerrequest
				agent.post('/prayerrequests')
					.send(prayerrequest)
					.expect(400)
					.end(function(prayerrequestSaveErr, prayerrequestSaveRes) {
						// Set message assertion
						(prayerrequestSaveRes.body.message).should.match('Please fill Prayerrequest name');
						
						// Handle Prayerrequest save error
						done(prayerrequestSaveErr);
					});
			});
	});

	it('should be able to update Prayerrequest instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Prayerrequest
				agent.post('/prayerrequests')
					.send(prayerrequest)
					.expect(200)
					.end(function(prayerrequestSaveErr, prayerrequestSaveRes) {
						// Handle Prayerrequest save error
						if (prayerrequestSaveErr) done(prayerrequestSaveErr);

						// Update Prayerrequest name
						prayerrequest.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Prayerrequest
						agent.put('/prayerrequests/' + prayerrequestSaveRes.body._id)
							.send(prayerrequest)
							.expect(200)
							.end(function(prayerrequestUpdateErr, prayerrequestUpdateRes) {
								// Handle Prayerrequest update error
								if (prayerrequestUpdateErr) done(prayerrequestUpdateErr);

								// Set assertions
								(prayerrequestUpdateRes.body._id).should.equal(prayerrequestSaveRes.body._id);
								(prayerrequestUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Prayerrequests if not signed in', function(done) {
		// Create new Prayerrequest model instance
		var prayerrequestObj = new Prayerrequest(prayerrequest);

		// Save the Prayerrequest
		prayerrequestObj.save(function() {
			// Request Prayerrequests
			request(app).get('/prayerrequests')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Prayerrequest if not signed in', function(done) {
		// Create new Prayerrequest model instance
		var prayerrequestObj = new Prayerrequest(prayerrequest);

		// Save the Prayerrequest
		prayerrequestObj.save(function() {
			request(app).get('/prayerrequests/' + prayerrequestObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', prayerrequest.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Prayerrequest instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Prayerrequest
				agent.post('/prayerrequests')
					.send(prayerrequest)
					.expect(200)
					.end(function(prayerrequestSaveErr, prayerrequestSaveRes) {
						// Handle Prayerrequest save error
						if (prayerrequestSaveErr) done(prayerrequestSaveErr);

						// Delete existing Prayerrequest
						agent.delete('/prayerrequests/' + prayerrequestSaveRes.body._id)
							.send(prayerrequest)
							.expect(200)
							.end(function(prayerrequestDeleteErr, prayerrequestDeleteRes) {
								// Handle Prayerrequest error error
								if (prayerrequestDeleteErr) done(prayerrequestDeleteErr);

								// Set assertions
								(prayerrequestDeleteRes.body._id).should.equal(prayerrequestSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Prayerrequest instance if not signed in', function(done) {
		// Set Prayerrequest user 
		prayerrequest.user = user;

		// Create new Prayerrequest model instance
		var prayerrequestObj = new Prayerrequest(prayerrequest);

		// Save the Prayerrequest
		prayerrequestObj.save(function() {
			// Try deleting Prayerrequest
			request(app).delete('/prayerrequests/' + prayerrequestObj._id)
			.expect(401)
			.end(function(prayerrequestDeleteErr, prayerrequestDeleteRes) {
				// Set message assertion
				(prayerrequestDeleteRes.body.message).should.match('User is not logged in');

				// Handle Prayerrequest error error
				done(prayerrequestDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Prayerrequest.remove().exec();
		done();
	});
});