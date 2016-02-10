'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Baptismmembershiprequest = mongoose.model('Baptismmembershiprequest'),
	_ = require('lodash');

/**
 * Create a Baptismmembershiprequest
 */
exports.create = function(req, res) {
	var baptismmembershiprequest = new Baptismmembershiprequest(req.body);
	baptismmembershiprequest.user = req.user;

	baptismmembershiprequest.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(baptismmembershiprequest);
		}
	});
};

/**
 * Show the current Baptismmembershiprequest
 */
exports.read = function(req, res) {
	res.jsonp(req.baptismmembershiprequest);
};

/**
 * Update a Baptismmembershiprequest
 */
exports.update = function(req, res) {
	var baptismmembershiprequest = req.baptismmembershiprequest ;

	baptismmembershiprequest = _.extend(baptismmembershiprequest , req.body);

	baptismmembershiprequest.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(baptismmembershiprequest);
		}
	});
};

/**
 * Delete an Baptismmembershiprequest
 */
exports.delete = function(req, res) {
	var baptismmembershiprequest = req.baptismmembershiprequest ;

	baptismmembershiprequest.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(baptismmembershiprequest);
		}
	});
};

/**
 * List of Baptismmembershiprequests
 */
exports.list = function(req, res) { 
	Baptismmembershiprequest.find().sort('-created').populate('user', 'displayName').exec(function(err, baptismmembershiprequests) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(baptismmembershiprequests);
		}
	});
};

/**
 * Baptismmembershiprequest middleware
 */
exports.baptismmembershiprequestByID = function(req, res, next, id) { 
	Baptismmembershiprequest.findById(id).populate('user', 'displayName').exec(function(err, baptismmembershiprequest) {
		if (err) return next(err);
		if (! baptismmembershiprequest) return next(new Error('Failed to load Baptismmembershiprequest ' + id));
		req.baptismmembershiprequest = baptismmembershiprequest ;
		next();
	});
};

/**
 * Baptismmembershiprequest authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.baptismmembershiprequest.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
