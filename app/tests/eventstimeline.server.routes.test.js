'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Eventstimeline = mongoose.model('Eventstimeline'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, eventstimeline;

/**
 * Eventstimeline routes tests
 */
describe('Eventstimeline CRUD tests', function() {
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

		// Save a user to the test db and create new Eventstimeline
		user.save(function() {
			eventstimeline = {
				name: 'Eventstimeline Name'
			};

			done();
		});
	});

	it('should be able to save Eventstimeline instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Eventstimeline
				agent.post('/eventstimelines')
					.send(eventstimeline)
					.expect(200)
					.end(function(eventstimelineSaveErr, eventstimelineSaveRes) {
						// Handle Eventstimeline save error
						if (eventstimelineSaveErr) done(eventstimelineSaveErr);

						// Get a list of Eventstimelines
						agent.get('/eventstimelines')
							.end(function(eventstimelinesGetErr, eventstimelinesGetRes) {
								// Handle Eventstimeline save error
								if (eventstimelinesGetErr) done(eventstimelinesGetErr);

								// Get Eventstimelines list
								var eventstimelines = eventstimelinesGetRes.body;

								// Set assertions
								(eventstimelines[0].user._id).should.equal(userId);
								(eventstimelines[0].name).should.match('Eventstimeline Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Eventstimeline instance if not logged in', function(done) {
		agent.post('/eventstimelines')
			.send(eventstimeline)
			.expect(401)
			.end(function(eventstimelineSaveErr, eventstimelineSaveRes) {
				// Call the assertion callback
				done(eventstimelineSaveErr);
			});
	});

	it('should not be able to save Eventstimeline instance if no name is provided', function(done) {
		// Invalidate name field
		eventstimeline.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Eventstimeline
				agent.post('/eventstimelines')
					.send(eventstimeline)
					.expect(400)
					.end(function(eventstimelineSaveErr, eventstimelineSaveRes) {
						// Set message assertion
						(eventstimelineSaveRes.body.message).should.match('Please fill Eventstimeline name');
						
						// Handle Eventstimeline save error
						done(eventstimelineSaveErr);
					});
			});
	});

	it('should be able to update Eventstimeline instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Eventstimeline
				agent.post('/eventstimelines')
					.send(eventstimeline)
					.expect(200)
					.end(function(eventstimelineSaveErr, eventstimelineSaveRes) {
						// Handle Eventstimeline save error
						if (eventstimelineSaveErr) done(eventstimelineSaveErr);

						// Update Eventstimeline name
						eventstimeline.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Eventstimeline
						agent.put('/eventstimelines/' + eventstimelineSaveRes.body._id)
							.send(eventstimeline)
							.expect(200)
							.end(function(eventstimelineUpdateErr, eventstimelineUpdateRes) {
								// Handle Eventstimeline update error
								if (eventstimelineUpdateErr) done(eventstimelineUpdateErr);

								// Set assertions
								(eventstimelineUpdateRes.body._id).should.equal(eventstimelineSaveRes.body._id);
								(eventstimelineUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Eventstimelines if not signed in', function(done) {
		// Create new Eventstimeline model instance
		var eventstimelineObj = new Eventstimeline(eventstimeline);

		// Save the Eventstimeline
		eventstimelineObj.save(function() {
			// Request Eventstimelines
			request(app).get('/eventstimelines')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Eventstimeline if not signed in', function(done) {
		// Create new Eventstimeline model instance
		var eventstimelineObj = new Eventstimeline(eventstimeline);

		// Save the Eventstimeline
		eventstimelineObj.save(function() {
			request(app).get('/eventstimelines/' + eventstimelineObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', eventstimeline.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Eventstimeline instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Eventstimeline
				agent.post('/eventstimelines')
					.send(eventstimeline)
					.expect(200)
					.end(function(eventstimelineSaveErr, eventstimelineSaveRes) {
						// Handle Eventstimeline save error
						if (eventstimelineSaveErr) done(eventstimelineSaveErr);

						// Delete existing Eventstimeline
						agent.delete('/eventstimelines/' + eventstimelineSaveRes.body._id)
							.send(eventstimeline)
							.expect(200)
							.end(function(eventstimelineDeleteErr, eventstimelineDeleteRes) {
								// Handle Eventstimeline error error
								if (eventstimelineDeleteErr) done(eventstimelineDeleteErr);

								// Set assertions
								(eventstimelineDeleteRes.body._id).should.equal(eventstimelineSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Eventstimeline instance if not signed in', function(done) {
		// Set Eventstimeline user 
		eventstimeline.user = user;

		// Create new Eventstimeline model instance
		var eventstimelineObj = new Eventstimeline(eventstimeline);

		// Save the Eventstimeline
		eventstimelineObj.save(function() {
			// Try deleting Eventstimeline
			request(app).delete('/eventstimelines/' + eventstimelineObj._id)
			.expect(401)
			.end(function(eventstimelineDeleteErr, eventstimelineDeleteRes) {
				// Set message assertion
				(eventstimelineDeleteRes.body.message).should.match('User is not logged in');

				// Handle Eventstimeline error error
				done(eventstimelineDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Eventstimeline.remove().exec();
		done();
	});
});