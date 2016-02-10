'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Mediaresource = mongoose.model('Mediaresource'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, mediaresource;

/**
 * Mediaresource routes tests
 */
describe('Mediaresource CRUD tests', function() {
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

		// Save a user to the test db and create new Mediaresource
		user.save(function() {
			mediaresource = {
				name: 'Mediaresource Name'
			};

			done();
		});
	});

	it('should be able to save Mediaresource instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mediaresource
				agent.post('/mediaresources')
					.send(mediaresource)
					.expect(200)
					.end(function(mediaresourceSaveErr, mediaresourceSaveRes) {
						// Handle Mediaresource save error
						if (mediaresourceSaveErr) done(mediaresourceSaveErr);

						// Get a list of Mediaresources
						agent.get('/mediaresources')
							.end(function(mediaresourcesGetErr, mediaresourcesGetRes) {
								// Handle Mediaresource save error
								if (mediaresourcesGetErr) done(mediaresourcesGetErr);

								// Get Mediaresources list
								var mediaresources = mediaresourcesGetRes.body;

								// Set assertions
								(mediaresources[0].user._id).should.equal(userId);
								(mediaresources[0].name).should.match('Mediaresource Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Mediaresource instance if not logged in', function(done) {
		agent.post('/mediaresources')
			.send(mediaresource)
			.expect(401)
			.end(function(mediaresourceSaveErr, mediaresourceSaveRes) {
				// Call the assertion callback
				done(mediaresourceSaveErr);
			});
	});

	it('should not be able to save Mediaresource instance if no name is provided', function(done) {
		// Invalidate name field
		mediaresource.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mediaresource
				agent.post('/mediaresources')
					.send(mediaresource)
					.expect(400)
					.end(function(mediaresourceSaveErr, mediaresourceSaveRes) {
						// Set message assertion
						(mediaresourceSaveRes.body.message).should.match('Please fill Mediaresource name');
						
						// Handle Mediaresource save error
						done(mediaresourceSaveErr);
					});
			});
	});

	it('should be able to update Mediaresource instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mediaresource
				agent.post('/mediaresources')
					.send(mediaresource)
					.expect(200)
					.end(function(mediaresourceSaveErr, mediaresourceSaveRes) {
						// Handle Mediaresource save error
						if (mediaresourceSaveErr) done(mediaresourceSaveErr);

						// Update Mediaresource name
						mediaresource.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Mediaresource
						agent.put('/mediaresources/' + mediaresourceSaveRes.body._id)
							.send(mediaresource)
							.expect(200)
							.end(function(mediaresourceUpdateErr, mediaresourceUpdateRes) {
								// Handle Mediaresource update error
								if (mediaresourceUpdateErr) done(mediaresourceUpdateErr);

								// Set assertions
								(mediaresourceUpdateRes.body._id).should.equal(mediaresourceSaveRes.body._id);
								(mediaresourceUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Mediaresources if not signed in', function(done) {
		// Create new Mediaresource model instance
		var mediaresourceObj = new Mediaresource(mediaresource);

		// Save the Mediaresource
		mediaresourceObj.save(function() {
			// Request Mediaresources
			request(app).get('/mediaresources')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Mediaresource if not signed in', function(done) {
		// Create new Mediaresource model instance
		var mediaresourceObj = new Mediaresource(mediaresource);

		// Save the Mediaresource
		mediaresourceObj.save(function() {
			request(app).get('/mediaresources/' + mediaresourceObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', mediaresource.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Mediaresource instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mediaresource
				agent.post('/mediaresources')
					.send(mediaresource)
					.expect(200)
					.end(function(mediaresourceSaveErr, mediaresourceSaveRes) {
						// Handle Mediaresource save error
						if (mediaresourceSaveErr) done(mediaresourceSaveErr);

						// Delete existing Mediaresource
						agent.delete('/mediaresources/' + mediaresourceSaveRes.body._id)
							.send(mediaresource)
							.expect(200)
							.end(function(mediaresourceDeleteErr, mediaresourceDeleteRes) {
								// Handle Mediaresource error error
								if (mediaresourceDeleteErr) done(mediaresourceDeleteErr);

								// Set assertions
								(mediaresourceDeleteRes.body._id).should.equal(mediaresourceSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Mediaresource instance if not signed in', function(done) {
		// Set Mediaresource user 
		mediaresource.user = user;

		// Create new Mediaresource model instance
		var mediaresourceObj = new Mediaresource(mediaresource);

		// Save the Mediaresource
		mediaresourceObj.save(function() {
			// Try deleting Mediaresource
			request(app).delete('/mediaresources/' + mediaresourceObj._id)
			.expect(401)
			.end(function(mediaresourceDeleteErr, mediaresourceDeleteRes) {
				// Set message assertion
				(mediaresourceDeleteRes.body.message).should.match('User is not logged in');

				// Handle Mediaresource error error
				done(mediaresourceDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Mediaresource.remove().exec();
		done();
	});
});