'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Ourbelief = mongoose.model('Ourbelief'),
	_ = require('lodash');

/**
 * Create a Ourbelief
 */
exports.create = function(req, res) {
	var ourbelief = new Ourbelief(req.body);
	ourbelief.user = req.user;

	ourbelief.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ourbelief);
		}
	});
};

/**
 * Show the current Ourbelief
 */
exports.read = function(req, res) {
	res.jsonp(req.ourbelief);
};

/**
 * Update a Ourbelief
 */
exports.update = function(req, res) {
	var ourbelief = req.ourbelief ;

	ourbelief = _.extend(ourbelief , req.body);

	ourbelief.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ourbelief);
		}
	});
};

/**
 * Delete an Ourbelief
 */
exports.delete = function(req, res) {
	var ourbelief = req.ourbelief ;

	ourbelief.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ourbelief);
		}
	});
};

/**
 * List of Ourbeliefs
 */
exports.list = function(req, res) { 
	Ourbelief.find().sort('+beleiefnumber').populate('user', 'displayName').exec(function(err, ourbeliefs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ourbeliefs);
		}
	});
};

/**
 * Ourbelief middleware
 */
exports.ourbeliefByID = function(req, res, next, id) { 
	Ourbelief.findById(id).populate('user', 'displayName').exec(function(err, ourbelief) {
		if (err) return next(err);
		if (! ourbelief) return next(new Error('Failed to load Ourbelief ' + id));
		req.ourbelief = ourbelief ;
		next();
	});
};

/**
 * Ourbelief authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.ourbelief.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
