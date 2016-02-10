'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Ministry = mongoose.model('Ministry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, ministry;

/**
 * Ministry routes tests
 */
describe('Ministry CRUD tests', function() {
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

		// Save a user to the test db and create new Ministry
		user.save(function() {
			ministry = {
				name: 'Ministry Name'
			};

			done();
		});
	});

	it('should be able to save Ministry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ministry
				agent.post('/ministries')
					.send(ministry)
					.expect(200)
					.end(function(ministrySaveErr, ministrySaveRes) {
						// Handle Ministry save error
						if (ministrySaveErr) done(ministrySaveErr);

						// Get a list of Ministries
						agent.get('/ministries')
							.end(function(ministriesGetErr, ministriesGetRes) {
								// Handle Ministry save error
								if (ministriesGetErr) done(ministriesGetErr);

								// Get Ministries list
								var ministries = ministriesGetRes.body;

								// Set assertions
								(ministries[0].user._id).should.equal(userId);
								(ministries[0].name).should.match('Ministry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Ministry instance if not logged in', function(done) {
		agent.post('/ministries')
			.send(ministry)
			.expect(401)
			.end(function(ministrySaveErr, ministrySaveRes) {
				// Call the assertion callback
				done(ministrySaveErr);
			});
	});

	it('should not be able to save Ministry instance if no name is provided', function(done) {
		// Invalidate name field
		ministry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ministry
				agent.post('/ministries')
					.send(ministry)
					.expect(400)
					.end(function(ministrySaveErr, ministrySaveRes) {
						// Set message assertion
						(ministrySaveRes.body.message).should.match('Please fill Ministry name');
						
						// Handle Ministry save error
						done(ministrySaveErr);
					});
			});
	});

	it('should be able to update Ministry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ministry
				agent.post('/ministries')
					.send(ministry)
					.expect(200)
					.end(function(ministrySaveErr, ministrySaveRes) {
						// Handle Ministry save error
						if (ministrySaveErr) done(ministrySaveErr);

						// Update Ministry name
						ministry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Ministry
						agent.put('/ministries/' + ministrySaveRes.body._id)
							.send(ministry)
							.expect(200)
							.end(function(ministryUpdateErr, ministryUpdateRes) {
								// Handle Ministry update error
								if (ministryUpdateErr) done(ministryUpdateErr);

								// Set assertions
								(ministryUpdateRes.body._id).should.equal(ministrySaveRes.body._id);
								(ministryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Ministries if not signed in', function(done) {
		// Create new Ministry model instance
		var ministryObj = new Ministry(ministry);

		// Save the Ministry
		ministryObj.save(function() {
			// Request Ministries
			request(app).get('/ministries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Ministry if not signed in', function(done) {
		// Create new Ministry model instance
		var ministryObj = new Ministry(ministry);

		// Save the Ministry
		ministryObj.save(function() {
			request(app).get('/ministries/' + ministryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', ministry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Ministry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ministry
				agent.post('/ministries')
					.send(ministry)
					.expect(200)
					.end(function(ministrySaveErr, ministrySaveRes) {
						// Handle Ministry save error
						if (ministrySaveErr) done(ministrySaveErr);

						// Delete existing Ministry
						agent.delete('/ministries/' + ministrySaveRes.body._id)
							.send(ministry)
							.expect(200)
							.end(function(ministryDeleteErr, ministryDeleteRes) {
								// Handle Ministry error error
								if (ministryDeleteErr) done(ministryDeleteErr);

								// Set assertions
								(ministryDeleteRes.body._id).should.equal(ministrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Ministry instance if not signed in', function(done) {
		// Set Ministry user 
		ministry.user = user;

		// Create new Ministry model instance
		var ministryObj = new Ministry(ministry);

		// Save the Ministry
		ministryObj.save(function() {
			// Try deleting Ministry
			request(app).delete('/ministries/' + ministryObj._id)
			.expect(401)
			.end(function(ministryDeleteErr, ministryDeleteRes) {
				// Set message assertion
				(ministryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Ministry error error
				done(ministryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Ministry.remove().exec();
		done();
	});
});