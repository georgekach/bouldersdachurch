'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Songrequest = mongoose.model('Songrequest'),
	_ = require('lodash');

/**
 * Create a Songrequest
 */
exports.create = function(req, res) {
	var songrequest = new Songrequest(req.body);
	songrequest.user = req.user;

	songrequest.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(songrequest);
		}
	});
};

/**
 * Show the current Songrequest
 */
exports.read = function(req, res) {
	res.jsonp(req.songrequest);
};

/**
 * Update a Songrequest
 */
exports.update = function(req, res) {
	var songrequest = req.songrequest ;

	songrequest = _.extend(songrequest , req.body);

	songrequest.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(songrequest);
		}
	});
};

/**
 * Delete an Songrequest
 */
exports.delete = function(req, res) {
	var songrequest = req.songrequest ;

	songrequest.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(songrequest);
		}
	});
};

/**
 * List of Songrequests
 */
exports.list = function(req, res) { 
	Songrequest.find().sort('-created').populate('user', 'displayName').exec(function(err, songrequests) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(songrequests);
		}
	});
};

/**
 * Songrequest middleware
 */
exports.songrequestByID = function(req, res, next, id) { 
	Songrequest.findById(id).populate('user', 'displayName').exec(function(err, songrequest) {
		if (err) return next(err);
		if (! songrequest) return next(new Error('Failed to load Songrequest ' + id));
		req.songrequest = songrequest ;
		next();
	});
};

/**
 * Songrequest authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.songrequest.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
