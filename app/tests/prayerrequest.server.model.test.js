'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Prayerrequest = mongoose.model('Prayerrequest');

/**
 * Globals
 */
var user, prayerrequest;

/**
 * Unit tests
 */
describe('Prayerrequest Model Unit Tests:', function() {
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
			prayerrequest = new Prayerrequest({
				name: 'Prayerrequest Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return prayerrequest.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			prayerrequest.name = '';

			return prayerrequest.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Prayerrequest.remove().exec();
		User.remove().exec();

		done();
	});
});