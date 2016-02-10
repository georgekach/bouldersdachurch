'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Prayerrequest = mongoose.model('Prayerrequest'),
	_ = require('lodash');

/**
 * Create a Prayerrequest
 */
exports.create = function(req, res) {
	var prayerrequest = new Prayerrequest(req.body);
	prayerrequest.user = req.user;

	prayerrequest.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(prayerrequest);
		}
	});
};

/**
 * Show the current Prayerrequest
 */
exports.read = function(req, res) {
	res.jsonp(req.prayerrequest);
};

/**
 * Update a Prayerrequest
 */
exports.update = function(req, res) {
	var prayerrequest = req.prayerrequest ;

	prayerrequest = _.extend(prayerrequest , req.body);

	prayerrequest.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(prayerrequest);
		}
	});
};

/**
 * Delete an Prayerrequest
 */
exports.delete = function(req, res) {
	var prayerrequest = req.prayerrequest ;

	prayerrequest.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(prayerrequest);
		}
	});
};

/**
 * List of Prayerrequests
 */
exports.list = function(req, res) { 
	Prayerrequest.find().sort('-created').populate('user', 'displayName').exec(function(err, prayerrequests) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(prayerrequests);
		}
	});
};

/**
 * Prayerrequest middleware
 */
exports.prayerrequestByID = function(req, res, next, id) { 
	Prayerrequest.findById(id).populate('user', 'displayName').exec(function(err, prayerrequest) {
		if (err) return next(err);
		if (! prayerrequest) return next(new Error('Failed to load Prayerrequest ' + id));
		req.prayerrequest = prayerrequest ;
		next();
	});
};

/**
 * Prayerrequest authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.prayerrequest.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
