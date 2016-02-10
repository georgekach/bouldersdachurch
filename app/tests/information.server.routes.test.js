'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Information = mongoose.model('Information'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, information;

/**
 * Information routes tests
 */
describe('Information CRUD tests', function() {
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

		// Save a user to the test db and create new Information
		user.save(function() {
			information = {
				name: 'Information Name'
			};

			done();
		});
	});

	it('should be able to save Information instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Information
				agent.post('/information')
					.send(information)
					.expect(200)
					.end(function(informationSaveErr, informationSaveRes) {
						// Handle Information save error
						if (informationSaveErr) done(informationSaveErr);

						// Get a list of Information
						agent.get('/information')
							.end(function(informationGetErr, informationGetRes) {
								// Handle Information save error
								if (informationGetErr) done(informationGetErr);

								// Get Information list
								var information = informationGetRes.body;

								// Set assertions
								(information[0].user._id).should.equal(userId);
								(information[0].name).should.match('Information Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Information instance if not logged in', function(done) {
		agent.post('/information')
			.send(information)
			.expect(401)
			.end(function(informationSaveErr, informationSaveRes) {
				// Call the assertion callback
				done(informationSaveErr);
			});
	});

	it('should not be able to save Information instance if no name is provided', function(done) {
		// Invalidate name field
		information.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Information
				agent.post('/information')
					.send(information)
					.expect(400)
					.end(function(informationSaveErr, informationSaveRes) {
						// Set message assertion
						(informationSaveRes.body.message).should.match('Please fill Information name');
						
						// Handle Information save error
						done(informationSaveErr);
					});
			});
	});

	it('should be able to update Information instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Information
				agent.post('/information')
					.send(information)
					.expect(200)
					.end(function(informationSaveErr, informationSaveRes) {
						// Handle Information save error
						if (informationSaveErr) done(informationSaveErr);

						// Update Information name
						information.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Information
						agent.put('/information/' + informationSaveRes.body._id)
							.send(information)
							.expect(200)
							.end(function(informationUpdateErr, informationUpdateRes) {
								// Handle Information update error
								if (informationUpdateErr) done(informationUpdateErr);

								// Set assertions
								(informationUpdateRes.body._id).should.equal(informationSaveRes.body._id);
								(informationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Information if not signed in', function(done) {
		// Create new Information model instance
		var informationObj = new Information(information);

		// Save the Information
		informationObj.save(function() {
			// Request Information
			request(app).get('/information')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Information if not signed in', function(done) {
		// Create new Information model instance
		var informationObj = new Information(information);

		// Save the Information
		informationObj.save(function() {
			request(app).get('/information/' + informationObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', information.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Information instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Information
				agent.post('/information')
					.send(information)
					.expect(200)
					.end(function(informationSaveErr, informationSaveRes) {
						// Handle Information save error
						if (informationSaveErr) done(informationSaveErr);

						// Delete existing Information
						agent.delete('/information/' + informationSaveRes.body._id)
							.send(information)
							.expect(200)
							.end(function(informationDeleteErr, informationDeleteRes) {
								// Handle Information error error
								if (informationDeleteErr) done(informationDeleteErr);

								// Set assertions
								(informationDeleteRes.body._id).should.equal(informationSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Information instance if not signed in', function(done) {
		// Set Information user 
		information.user = user;

		// Create new Information model instance
		var informationObj = new Information(information);

		// Save the Information
		informationObj.save(function() {
			// Try deleting Information
			request(app).delete('/information/' + informationObj._id)
			.expect(401)
			.end(function(informationDeleteErr, informationDeleteRes) {
				// Set message assertion
				(informationDeleteRes.body.message).should.match('User is not logged in');

				// Handle Information error error
				done(informationDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Information.remove().exec();
		done();
	});
});