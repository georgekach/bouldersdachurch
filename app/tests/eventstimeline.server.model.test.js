'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Eventstimeline = mongoose.model('Eventstimeline');

/**
 * Globals
 */
var user, eventstimeline;

/**
 * Unit tests
 */
describe('Eventstimeline Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			eventstimeline = new Eventstimeline({
				name: 'Eventstimeline Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return eventstimeline.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			eventstimeline.name = '';

			return eventstimeline.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Eventstimeline.remove().exec();
		User.remove().exec();

		done();
	});
});