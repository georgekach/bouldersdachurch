'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Ministry = mongoose.model('Ministry'),
	_ = require('lodash');

/**
 * Create a Ministry
 */
exports.create = function(req, res) {
	var ministry = new Ministry(req.body);
	ministry.user = req.user;

	ministry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ministry);
		}
	});
};

/**
 * Show the current Ministry
 */
exports.read = function(req, res) {
	res.jsonp(req.ministry);
};

/**
 * Update a Ministry
 */
exports.update = function(req, res) {
	var ministry = req.ministry ;

	ministry = _.extend(ministry , req.body);

	ministry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ministry);
		}
	});
};

/**
 * Delete an Ministry
 */
exports.delete = function(req, res) {
	var ministry = req.ministry ;

	ministry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ministry);
		}
	});
};

/**
 * List of Ministries
 */
exports.list = function(req, res) { 
	Ministry.find().sort('-created').populate('user', 'displayName').exec(function(err, ministries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(ministries);
		}
	});
};

/**
 * Ministry middleware
 */
exports.ministryByID = function(req, res, next, id) { 
	Ministry.findById(id).populate('user', 'displayName').exec(function(err, ministry) {
		if (err) return next(err);
		if (! ministry) return next(new Error('Failed to load Ministry ' + id));
		req.ministry = ministry ;
		next();
	});
};

/**
 * Ministry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.ministry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
