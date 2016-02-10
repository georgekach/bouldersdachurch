'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Ourbelief = mongoose.model('Ourbelief'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, ourbelief;

/**
 * Ourbelief routes tests
 */
describe('Ourbelief CRUD tests', function() {
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

		// Save a user to the test db and create new Ourbelief
		user.save(function() {
			ourbelief = {
				name: 'Ourbelief Name'
			};

			done();
		});
	});

	it('should be able to save Ourbelief instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ourbelief
				agent.post('/ourbeliefs')
					.send(ourbelief)
					.expect(200)
					.end(function(ourbeliefSaveErr, ourbeliefSaveRes) {
						// Handle Ourbelief save error
						if (ourbeliefSaveErr) done(ourbeliefSaveErr);

						// Get a list of Ourbeliefs
						agent.get('/ourbeliefs')
							.end(function(ourbeliefsGetErr, ourbeliefsGetRes) {
								// Handle Ourbelief save error
								if (ourbeliefsGetErr) done(ourbeliefsGetErr);

								// Get Ourbeliefs list
								var ourbeliefs = ourbeliefsGetRes.body;

								// Set assertions
								(ourbeliefs[0].user._id).should.equal(userId);
								(ourbeliefs[0].name).should.match('Ourbelief Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Ourbelief instance if not logged in', function(done) {
		agent.post('/ourbeliefs')
			.send(ourbelief)
			.expect(401)
			.end(function(ourbeliefSaveErr, ourbeliefSaveRes) {
				// Call the assertion callback
				done(ourbeliefSaveErr);
			});
	});

	it('should not be able to save Ourbelief instance if no name is provided', function(done) {
		// Invalidate name field
		ourbelief.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ourbelief
				agent.post('/ourbeliefs')
					.send(ourbelief)
					.expect(400)
					.end(function(ourbeliefSaveErr, ourbeliefSaveRes) {
						// Set message assertion
						(ourbeliefSaveRes.body.message).should.match('Please fill Ourbelief name');
						
						// Handle Ourbelief save error
						done(ourbeliefSaveErr);
					});
			});
	});

	it('should be able to update Ourbelief instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ourbelief
				agent.post('/ourbeliefs')
					.send(ourbelief)
					.expect(200)
					.end(function(ourbeliefSaveErr, ourbeliefSaveRes) {
						// Handle Ourbelief save error
						if (ourbeliefSaveErr) done(ourbeliefSaveErr);

						// Update Ourbelief name
						ourbelief.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Ourbelief
						agent.put('/ourbeliefs/' + ourbeliefSaveRes.body._id)
							.send(ourbelief)
							.expect(200)
							.end(function(ourbeliefUpdateErr, ourbeliefUpdateRes) {
								// Handle Ourbelief update error
								if (ourbeliefUpdateErr) done(ourbeliefUpdateErr);

								// Set assertions
								(ourbeliefUpdateRes.body._id).should.equal(ourbeliefSaveRes.body._id);
								(ourbeliefUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Ourbeliefs if not signed in', function(done) {
		// Create new Ourbelief model instance
		var ourbeliefObj = new Ourbelief(ourbelief);

		// Save the Ourbelief
		ourbeliefObj.save(function() {
			// Request Ourbeliefs
			request(app).get('/ourbeliefs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Ourbelief if not signed in', function(done) {
		// Create new Ourbelief model instance
		var ourbeliefObj = new Ourbelief(ourbelief);

		// Save the Ourbelief
		ourbeliefObj.save(function() {
			request(app).get('/ourbeliefs/' + ourbeliefObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', ourbelief.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Ourbelief instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Ourbelief
				agent.post('/ourbeliefs')
					.send(ourbelief)
					.expect(200)
					.end(function(ourbeliefSaveErr, ourbeliefSaveRes) {
						// Handle Ourbelief save error
						if (ourbeliefSaveErr) done(ourbeliefSaveErr);

						// Delete existing Ourbelief
						agent.delete('/ourbeliefs/' + ourbeliefSaveRes.body._id)
							.send(ourbelief)
							.expect(200)
							.end(function(ourbeliefDeleteErr, ourbeliefDeleteRes) {
								// Handle Ourbelief error error
								if (ourbeliefDeleteErr) done(ourbeliefDeleteErr);

								// Set assertions
								(ourbeliefDeleteRes.body._id).should.equal(ourbeliefSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Ourbelief instance if not signed in', function(done) {
		// Set Ourbelief user 
		ourbelief.user = user;

		// Create new Ourbelief model instance
		var ourbeliefObj = new Ourbelief(ourbelief);

		// Save the Ourbelief
		ourbeliefObj.save(function() {
			// Try deleting Ourbelief
			request(app).delete('/ourbeliefs/' + ourbeliefObj._id)
			.expect(401)
			.end(function(ourbeliefDeleteErr, ourbeliefDeleteRes) {
				// Set message assertion
				(ourbeliefDeleteRes.body.message).should.match('User is not logged in');

				// Handle Ourbelief error error
				done(ourbeliefDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Ourbelief.remove().exec();
		done();
	});
});