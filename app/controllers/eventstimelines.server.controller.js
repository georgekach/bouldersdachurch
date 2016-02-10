'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Eventstimeline = mongoose.model('Eventstimeline'),
	_ = require('lodash');

/**
 * Create a Eventstimeline
 */
exports.create = function(req, res) {
	var eventstimeline = new Eventstimeline(req.body);
	eventstimeline.user = req.user;

	eventstimeline.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(eventstimeline);
		}
	});
};

/**
 * Show the current Eventstimeline
 */
exports.read = function(req, res) {
	res.jsonp(req.eventstimeline);
};

/**
 * Update a Eventstimeline
 */
exports.update = function(req, res) {
	var eventstimeline = req.eventstimeline ;

	eventstimeline = _.extend(eventstimeline , req.body);

	eventstimeline.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(eventstimeline);
		}
	});
};

/**
 * Delete an Eventstimeline
 */
exports.delete = function(req, res) {
	var eventstimeline = req.eventstimeline ;

	eventstimeline.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(eventstimeline);
		}
	});
};

/**
 * List of Eventstimelines
 */
exports.list = function(req, res) { 
	Eventstimeline.find().sort('-created').populate('user', 'displayName').exec(function(err, eventstimelines) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(eventstimelines);
		}
	});
};

/**
 * Eventstimeline middleware
 */
exports.eventstimelineByID = function(req, res, next, id) { 
	Eventstimeline.findById(id).populate('user', 'displayName').exec(function(err, eventstimeline) {
		if (err) return next(err);
		if (! eventstimeline) return next(new Error('Failed to load Eventstimeline ' + id));
		req.eventstimeline = eventstimeline ;
		next();
	});
};

/**
 * Eventstimeline authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.eventstimeline.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
